import { RefreshCw, CalendarDays, Clock, Phone, User, FileText, Loader2, Lock, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetAllBookings } from '@/hooks/useQueries';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';

function formatDate(dateStr: string): string {
    if (!dateStr) return '—';
    try {
        return new Date(dateStr).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
    } catch {
        return dateStr;
    }
}

function formatTime(timeStr: string): string {
    if (!timeStr) return '—';
    try {
        const [h, m] = timeStr.split(':');
        const hour = parseInt(h, 10);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour % 12 || 12;
        return `${displayHour}:${m} ${ampm}`;
    } catch {
        return timeStr;
    }
}

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
                        The Bookings List is only accessible to authorised clinic staff. Please log in to continue.
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

export default function BookingsList() {
    const { login, loginStatus, identity, isInitializing } = useInternetIdentity();
    const isAuthenticated = loginStatus === 'success' && !!identity;
    const isLoggingIn = loginStatus === 'logging-in';

    const { data: bookings, isLoading, isError, refetch, isFetching } = useGetAllBookings();

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
                        Bookings List
                    </h1>
                    <p className="text-muted-foreground">All consultation appointment requests.</p>
                </div>
                <Button
                    variant="outline"
                    onClick={() => refetch()}
                    disabled={isFetching}
                    className="border-primary text-primary hover:bg-primary/10 self-start sm:self-auto"
                >
                    {isFetching ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                        <RefreshCw className="h-4 w-4 mr-2" />
                    )}
                    Refresh
                </Button>
            </div>

            {/* Loading */}
            {isLoading && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[...Array(4)].map((_, i) => (
                        <Card key={i} className="border-border">
                            <CardContent className="p-5 space-y-3">
                                <Skeleton className="h-5 w-40" />
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-4 w-48" />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {/* Error */}
            {isError && (
                <Card className="border-destructive/30 bg-destructive/5">
                    <CardContent className="p-6 text-center">
                        <p className="text-destructive font-medium">Failed to load bookings. Please try refreshing.</p>
                    </CardContent>
                </Card>
            )}

            {/* Empty */}
            {!isLoading && !isError && (!bookings || bookings.length === 0) && (
                <Card className="border-border shadow-card">
                    <CardContent className="p-12 text-center">
                        <CalendarDays className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="font-semibold text-foreground mb-1">No Bookings Yet</h3>
                        <p className="text-sm text-muted-foreground">
                            Consultation bookings will appear here once patients submit requests.
                        </p>
                    </CardContent>
                </Card>
            )}

            {/* Bookings Grid */}
            {!isLoading && bookings && bookings.length > 0 && (
                <>
                    <p className="text-sm text-muted-foreground mb-4">
                        Showing <span className="font-semibold text-foreground">{bookings.length}</span> booking{bookings.length !== 1 ? 's' : ''}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {bookings.map((booking) => (
                            <Card key={String(booking.id)} className="card-hover border-border shadow-card">
                                <CardHeader className="pb-2">
                                    <div className="flex items-start justify-between gap-2">
                                        <CardTitle className="text-base font-semibold flex items-center gap-2">
                                            <User className="h-4 w-4 text-primary shrink-0" />
                                            {booking.patientName}
                                        </CardTitle>
                                        <Badge variant="secondary" className="text-xs shrink-0">
                                            #{String(booking.id)}
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="pt-0 space-y-2">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Phone className="h-3.5 w-3.5 text-primary shrink-0" />
                                        <span>{booking.mobileNumber}</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                        <span className="flex items-center gap-1.5">
                                            <CalendarDays className="h-3.5 w-3.5 text-primary" />
                                            {formatDate(booking.preferredDate)}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <Clock className="h-3.5 w-3.5 text-primary" />
                                            {formatTime(booking.preferredTime)}
                                        </span>
                                    </div>
                                    {booking.reasonSymptoms && (
                                        <div className="flex items-start gap-2 text-sm text-muted-foreground pt-1 border-t border-border">
                                            <FileText className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                                            <span className="line-clamp-2">{booking.reasonSymptoms}</span>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
