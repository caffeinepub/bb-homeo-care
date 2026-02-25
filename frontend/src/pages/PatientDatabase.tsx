import { useState } from 'react';
import { Search, UserPlus, Users, Loader2, AlertCircle, X, Lock, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { useSearchPatients, useCreatePatientRecord } from '@/hooks/useQueries';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';

interface PatientForm {
    name: string;
    uhid: string;
    mobileNumber: string;
    symptoms: string;
}

const initialForm: PatientForm = {
    name: '',
    uhid: '',
    mobileNumber: '',
    symptoms: '',
};

function LockScreen({ onLogin, isLoggingIn }: { onLogin: () => void; isLoggingIn: boolean }) {
    return (
        <div className="container mx-auto px-4 py-20 flex items-center justify-center animate-fade-in">
            <Card className="w-full max-w-md border-border shadow-card text-center">
                <CardHeader className="pb-4">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                        <Lock className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-serif font-bold text-foreground">
                        Access Restricted
                    </CardTitle>
                    <CardDescription className="text-muted-foreground mt-2">
                        The Patient Database is only accessible to authorised clinic staff. Please log in to continue.
                    </CardDescription>
                </CardHeader>
                <CardContent className="pb-8">
                    <Button
                        onClick={onLogin}
                        disabled={isLoggingIn}
                        className="bg-primary text-primary-foreground hover:bg-primary/90 w-full"
                        size="lg"
                    >
                        {isLoggingIn ? (
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                            <LogIn className="h-4 w-4 mr-2" />
                        )}
                        {isLoggingIn ? 'Logging in…' : 'Login with Internet Identity'}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}

export default function PatientDatabase() {
    const { login, loginStatus, identity, isInitializing } = useInternetIdentity();
    const isAuthenticated = loginStatus === 'success' && !!identity;
    const isLoggingIn = loginStatus === 'logging-in';

    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [form, setForm] = useState<PatientForm>(initialForm);
    const [formErrors, setFormErrors] = useState<Partial<PatientForm>>({});
    const [addSuccess, setAddSuccess] = useState(false);

    const { data: patients, isLoading, isError } = useSearchPatients(debouncedSearch);
    const createPatient = useCreatePatientRecord();

    // Simple debounce via timeout
    const handleSearchChange = (value: string) => {
        setSearchTerm(value);
        const timer = setTimeout(() => setDebouncedSearch(value), 400);
        return () => clearTimeout(timer);
    };

    const validateForm = (): boolean => {
        const errors: Partial<PatientForm> = {};
        if (!form.name.trim()) errors.name = 'Patient name is required.';
        if (!form.uhid.trim()) {
            errors.uhid = 'UHID number is required.';
        } else if (!/^[A-Za-z0-9-]+$/.test(form.uhid.trim())) {
            errors.uhid = 'UHID must contain only letters, numbers, or hyphens.';
        }
        if (!form.mobileNumber.trim()) {
            errors.mobileNumber = 'Mobile number is required.';
        } else if (!/^\d{10}$/.test(form.mobileNumber.replace(/\s/g, ''))) {
            errors.mobileNumber = 'Enter a valid 10-digit mobile number.';
        }
        if (!form.symptoms.trim()) errors.symptoms = 'Symptoms are required.';
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleFormChange = (field: keyof PatientForm, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        if (formErrors[field]) setFormErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    const handleAddPatient = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            await createPatient.mutateAsync({
                name: form.name.trim(),
                uhid: form.uhid.trim(),
                mobileNumber: form.mobileNumber.trim(),
                symptoms: form.symptoms.trim(),
            });
            setAddSuccess(true);
            setForm(initialForm);
            setTimeout(() => {
                setAddSuccess(false);
                setShowAddDialog(false);
                createPatient.reset();
            }, 2000);
        } catch {
            // error handled via createPatient.isError
        }
    };

    const handleCloseDialog = () => {
        setShowAddDialog(false);
        setForm(initialForm);
        setFormErrors({});
        setAddSuccess(false);
        createPatient.reset();
    };

    // Show loading while identity is initializing
    if (isInitializing) {
        return (
            <div className="container mx-auto px-4 py-20 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    // Show lock screen if not authenticated
    if (!isAuthenticated) {
        return <LockScreen onLogin={login} isLoggingIn={isLoggingIn} />;
    }

    return (
        <div className="container mx-auto px-4 py-12 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-1">
                        Patient Database
                    </h1>
                    <p className="text-muted-foreground">Search and manage patient records.</p>
                </div>
                <Button
                    onClick={() => setShowAddDialog(true)}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 self-start sm:self-auto"
                >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add Patient
                </Button>
            </div>

            {/* Search */}
            <Card className="border-border shadow-card mb-6">
                <CardContent className="p-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search by patient name or symptoms..."
                            value={searchTerm}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            className="pl-9"
                        />
                        {searchTerm && (
                            <button
                                onClick={() => { setSearchTerm(''); setDebouncedSearch(''); }}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Patient Table */}
            <Card className="border-border shadow-card">
                <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-serif flex items-center gap-2">
                        <Users className="h-5 w-5 text-primary" />
                        Patient Records
                    </CardTitle>
                    {!isLoading && patients && (
                        <CardDescription>
                            {patients.length} record{patients.length !== 1 ? 's' : ''} found
                            {debouncedSearch ? ` for "${debouncedSearch}"` : ''}
                        </CardDescription>
                    )}
                </CardHeader>
                <CardContent className="p-0">
                    {/* Loading */}
                    {isLoading && (
                        <div className="p-6 space-y-3">
                            {[...Array(4)].map((_, i) => (
                                <Skeleton key={i} className="h-10 w-full" />
                            ))}
                        </div>
                    )}

                    {/* Error */}
                    {isError && (
                        <div className="p-6">
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>Failed to load patient records.</AlertDescription>
                            </Alert>
                        </div>
                    )}

                    {/* Empty */}
                    {!isLoading && !isError && (!patients || patients.length === 0) && (
                        <div className="p-12 text-center">
                            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                            <h3 className="font-semibold text-foreground mb-1">
                                {debouncedSearch ? 'No Matching Records' : 'No Patients Yet'}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                {debouncedSearch
                                    ? `No patients found matching "${debouncedSearch}".`
                                    : 'Add your first patient record using the button above.'}
                            </p>
                        </div>
                    )}

                    {/* Table */}
                    {!isLoading && patients && patients.length > 0 && (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-muted/40">
                                        <TableHead className="font-semibold text-foreground">Patient Name</TableHead>
                                        <TableHead className="font-semibold text-foreground">UHID</TableHead>
                                        <TableHead className="font-semibold text-foreground">Mobile</TableHead>
                                        <TableHead className="font-semibold text-foreground">Symptoms</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {patients.map((patient) => (
                                        <TableRow key={patient.uhid} className="hover:bg-accent/30 transition-colors">
                                            <TableCell className="font-medium text-foreground">
                                                {patient.name}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className="font-mono text-xs border-primary/30 text-primary">
                                                    {patient.uhid}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-muted-foreground">
                                                {patient.mobileNumber}
                                            </TableCell>
                                            <TableCell className="text-muted-foreground max-w-xs">
                                                <span className="line-clamp-2">{patient.symptoms}</span>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Add Patient Dialog */}
            <Dialog open={showAddDialog} onOpenChange={(open) => { if (!open) handleCloseDialog(); }}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="font-serif text-xl">Add New Patient</DialogTitle>
                        <DialogDescription>
                            Fill in the patient details below. UHID must be unique.
                        </DialogDescription>
                    </DialogHeader>

                    {addSuccess ? (
                        <div className="py-8 text-center">
                            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                <Users className="h-6 w-6 text-primary" />
                            </div>
                            <p className="font-semibold text-foreground">Patient Added Successfully!</p>
                            <p className="text-sm text-muted-foreground mt-1">The record has been saved.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleAddPatient} className="space-y-4">
                            <div className="space-y-1.5">
                                <Label htmlFor="name">Patient Name <span className="text-destructive">*</span></Label>
                                <Input
                                    id="name"
                                    placeholder="Full name"
                                    value={form.name}
                                    onChange={(e) => handleFormChange('name', e.target.value)}
                                    className={formErrors.name ? 'border-destructive' : ''}
                                />
                                {formErrors.name && <p className="text-xs text-destructive">{formErrors.name}</p>}
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="uhid">UHID <span className="text-destructive">*</span></Label>
                                <Input
                                    id="uhid"
                                    placeholder="e.g. BB-2024-001"
                                    value={form.uhid}
                                    onChange={(e) => handleFormChange('uhid', e.target.value)}
                                    className={formErrors.uhid ? 'border-destructive' : ''}
                                />
                                {formErrors.uhid && <p className="text-xs text-destructive">{formErrors.uhid}</p>}
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="mobileNumber">Mobile Number <span className="text-destructive">*</span></Label>
                                <Input
                                    id="mobileNumber"
                                    placeholder="10-digit mobile number"
                                    value={form.mobileNumber}
                                    onChange={(e) => handleFormChange('mobileNumber', e.target.value)}
                                    className={formErrors.mobileNumber ? 'border-destructive' : ''}
                                />
                                {formErrors.mobileNumber && <p className="text-xs text-destructive">{formErrors.mobileNumber}</p>}
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="symptoms">Symptoms / Diagnosis <span className="text-destructive">*</span></Label>
                                <Textarea
                                    id="symptoms"
                                    placeholder="Describe symptoms or diagnosis..."
                                    value={form.symptoms}
                                    onChange={(e) => handleFormChange('symptoms', e.target.value)}
                                    rows={3}
                                    className={formErrors.symptoms ? 'border-destructive' : ''}
                                />
                                {formErrors.symptoms && <p className="text-xs text-destructive">{formErrors.symptoms}</p>}
                            </div>

                            {createPatient.isError && (
                                <Alert variant="destructive">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertTitle>Error</AlertTitle>
                                    <AlertDescription>
                                        {createPatient.error instanceof Error && createPatient.error.message.includes('already exists')
                                            ? 'A patient with this UHID already exists. Please use a different UHID.'
                                            : 'Failed to add patient. Please try again.'}
                                    </AlertDescription>
                                </Alert>
                            )}

                            <DialogFooter className="gap-2 pt-2">
                                <Button type="button" variant="outline" onClick={handleCloseDialog}>
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={createPatient.isPending}
                                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                                >
                                    {createPatient.isPending ? (
                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    ) : (
                                        <UserPlus className="h-4 w-4 mr-2" />
                                    )}
                                    {createPatient.isPending ? 'Saving…' : 'Add Patient'}
                                </Button>
                            </DialogFooter>
                        </form>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
