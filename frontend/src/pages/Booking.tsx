import { useState } from 'react';
import { CalendarPlus, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useSubmitBooking } from '@/hooks/useQueries';

interface BookingForm {
    patientName: string;
    mobileNumber: string;
    preferredDate: string;
    preferredTime: string;
    reasonSymptoms: string;
}

const initialForm: BookingForm = {
    patientName: '',
    mobileNumber: '',
    preferredDate: '',
    preferredTime: '',
    reasonSymptoms: '',
};

export default function Booking() {
    const [form, setForm] = useState<BookingForm>(initialForm);
    const [errors, setErrors] = useState<Partial<BookingForm>>({});
    const [submitted, setSubmitted] = useState(false);

    const submitBooking = useSubmitBooking();

    const validate = (): boolean => {
        const newErrors: Partial<BookingForm> = {};
        if (!form.patientName.trim()) newErrors.patientName = 'Patient name is required.';
        if (!form.mobileNumber.trim()) {
            newErrors.mobileNumber = 'Mobile number is required.';
        } else if (!/^\d{10}$/.test(form.mobileNumber.replace(/\s/g, ''))) {
            newErrors.mobileNumber = 'Enter a valid 10-digit mobile number.';
        }
        if (!form.preferredDate) newErrors.preferredDate = 'Preferred date is required.';
        if (!form.preferredTime) newErrors.preferredTime = 'Preferred time is required.';
        if (!form.reasonSymptoms.trim()) newErrors.reasonSymptoms = 'Please describe your symptoms or reason for visit.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (field: keyof BookingForm, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            await submitBooking.mutateAsync({
                patientName: form.patientName.trim(),
                mobileNumber: form.mobileNumber.trim(),
                preferredDate: form.preferredDate,
                preferredTime: form.preferredTime,
                reasonSymptoms: form.reasonSymptoms.trim(),
            });
            setSubmitted(true);
            setForm(initialForm);
        } catch {
            // error handled via submitBooking.isError
        }
    };

    const handleBookAnother = () => {
        setSubmitted(false);
        submitBooking.reset();
    };

    // Today's date for min date
    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="container mx-auto px-4 py-12 max-w-2xl animate-fade-in">
            {/* Page Header */}
            <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                    <CalendarPlus className="h-8 w-8" />
                </div>
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-2">
                    Book a Consultation
                </h1>
                <p className="text-muted-foreground">
                    Fill in the details below and we'll confirm your appointment at BB Homeo Care.
                </p>
            </div>

            {/* Success State */}
            {submitted && (
                <Alert className="mb-6 border-primary/30 bg-primary/5 animate-fade-in">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <AlertTitle className="text-primary font-semibold">Booking Confirmed!</AlertTitle>
                    <AlertDescription className="text-foreground/70">
                        Your consultation request has been submitted successfully. We will contact you shortly to confirm your appointment.
                    </AlertDescription>
                    <div className="mt-3">
                        <Button size="sm" variant="outline" onClick={handleBookAnother} className="border-primary text-primary hover:bg-primary/10">
                            Book Another Appointment
                        </Button>
                    </div>
                </Alert>
            )}

            {/* Error State */}
            {submitBooking.isError && !submitted && (
                <Alert variant="destructive" className="mb-6">
                    <AlertCircle className="h-5 w-5" />
                    <AlertTitle>Submission Failed</AlertTitle>
                    <AlertDescription>
                        {submitBooking.error instanceof Error
                            ? submitBooking.error.message
                            : 'Something went wrong. Please try again.'}
                    </AlertDescription>
                </Alert>
            )}

            {/* Booking Form */}
            {!submitted && (
                <Card className="shadow-card border-border">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-xl font-serif">Appointment Details</CardTitle>
                        <CardDescription>All fields are required.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Patient Name */}
                            <div className="space-y-1.5">
                                <Label htmlFor="patientName">Patient Name</Label>
                                <Input
                                    id="patientName"
                                    placeholder="Enter full name"
                                    value={form.patientName}
                                    onChange={(e) => handleChange('patientName', e.target.value)}
                                    className={errors.patientName ? 'border-destructive' : ''}
                                />
                                {errors.patientName && (
                                    <p className="text-xs text-destructive">{errors.patientName}</p>
                                )}
                            </div>

                            {/* Mobile Number */}
                            <div className="space-y-1.5">
                                <Label htmlFor="mobileNumber">Mobile Number</Label>
                                <Input
                                    id="mobileNumber"
                                    type="tel"
                                    placeholder="10-digit mobile number"
                                    value={form.mobileNumber}
                                    onChange={(e) => handleChange('mobileNumber', e.target.value)}
                                    className={errors.mobileNumber ? 'border-destructive' : ''}
                                />
                                {errors.mobileNumber && (
                                    <p className="text-xs text-destructive">{errors.mobileNumber}</p>
                                )}
                            </div>

                            {/* Date & Time */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <Label htmlFor="preferredDate">Preferred Date</Label>
                                    <Input
                                        id="preferredDate"
                                        type="date"
                                        min={today}
                                        value={form.preferredDate}
                                        onChange={(e) => handleChange('preferredDate', e.target.value)}
                                        className={errors.preferredDate ? 'border-destructive' : ''}
                                    />
                                    {errors.preferredDate && (
                                        <p className="text-xs text-destructive">{errors.preferredDate}</p>
                                    )}
                                </div>
                                <div className="space-y-1.5">
                                    <Label htmlFor="preferredTime">Preferred Time</Label>
                                    <Input
                                        id="preferredTime"
                                        type="time"
                                        value={form.preferredTime}
                                        onChange={(e) => handleChange('preferredTime', e.target.value)}
                                        className={errors.preferredTime ? 'border-destructive' : ''}
                                    />
                                    {errors.preferredTime && (
                                        <p className="text-xs text-destructive">{errors.preferredTime}</p>
                                    )}
                                </div>
                            </div>

                            {/* Symptoms */}
                            <div className="space-y-1.5">
                                <Label htmlFor="reasonSymptoms">Symptoms / Reason for Visit</Label>
                                <Textarea
                                    id="reasonSymptoms"
                                    placeholder="Describe your symptoms or reason for consultation..."
                                    rows={4}
                                    value={form.reasonSymptoms}
                                    onChange={(e) => handleChange('reasonSymptoms', e.target.value)}
                                    className={errors.reasonSymptoms ? 'border-destructive' : ''}
                                />
                                {errors.reasonSymptoms && (
                                    <p className="text-xs text-destructive">{errors.reasonSymptoms}</p>
                                )}
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
                                disabled={submitBooking.isPending}
                                size="lg"
                            >
                                {submitBooking.isPending ? (
                                    <>
                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        <CalendarPlus className="h-4 w-4 mr-2" />
                                        Confirm Booking
                                    </>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
