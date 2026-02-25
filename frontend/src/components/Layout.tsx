import { useState } from 'react';
import { Link, useRouterState } from '@tanstack/react-router';
import { Menu, X, Phone, MapPin, LogIn, LogOut, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';

const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Book Consultation', path: '/booking' },
    { label: 'Patient Database', path: '/patients' },
    { label: 'Bookings List', path: '/admin/bookings' },
    { label: 'About Us', path: '/about' },
];

function abbreviatePrincipal(principal: string): string {
    if (principal.length <= 14) return principal;
    return `${principal.slice(0, 8)}…${principal.slice(-4)}`;
}

export default function Layout({ children }: { children: React.ReactNode }) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const routerState = useRouterState();
    const currentPath = routerState.location.pathname;
    const { login, clear, loginStatus, identity, isInitializing } = useInternetIdentity();

    const isAuthenticated = loginStatus === 'success' && !!identity;
    const isLoggingIn = loginStatus === 'logging-in';
    const principal = identity?.getPrincipal().toString() ?? '';

    const appId = encodeURIComponent(window.location.hostname || 'bbhomeocare');

    return (
        <div className="min-h-screen flex flex-col bg-background">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-card border-b border-border shadow-xs">
                <div className="container mx-auto px-4 py-2 flex items-center justify-between gap-3">
                    {/* Logo */}
                    <Link to="/" className="flex items-center shrink-0 group">
                        <img
                            src="/assets/generated/bb-homeo-care-logo.dim_512x512.png"
                            alt="BB Homeo Care – Balanced Being"
                            className="h-9 md:h-12 w-auto object-contain transition-opacity group-hover:opacity-90"
                        />
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-1 flex-1 ml-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                    currentPath === link.path
                                        ? 'bg-primary/10 text-primary font-semibold'
                                        : 'text-foreground/70 hover:text-primary hover:bg-primary/5'
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop Auth Controls */}
                    <div className="hidden md:flex items-center gap-2 shrink-0">
                        {isInitializing ? (
                            <div className="h-8 w-20 bg-muted animate-pulse rounded-md" />
                        ) : isAuthenticated ? (
                            <>
                                <span className="text-xs text-muted-foreground font-mono bg-muted px-2 py-1 rounded-md max-w-[140px] truncate" title={principal}>
                                    {abbreviatePrincipal(principal)}
                                </span>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => clear()}
                                    className="border-destructive/40 text-destructive hover:bg-destructive/10 hover:text-destructive"
                                >
                                    <LogOut className="h-3.5 w-3.5 mr-1.5" />
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <Button
                                size="sm"
                                onClick={() => login()}
                                disabled={isLoggingIn}
                                className="bg-primary text-primary-foreground hover:bg-primary/90"
                            >
                                {isLoggingIn ? (
                                    <Lock className="h-3.5 w-3.5 mr-1.5 animate-pulse" />
                                ) : (
                                    <LogIn className="h-3.5 w-3.5 mr-1.5" />
                                )}
                                {isLoggingIn ? 'Logging in…' : 'Login'}
                            </Button>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </Button>
                </div>

                {/* Mobile Nav */}
                {mobileOpen && (
                    <div className="md:hidden border-t border-border bg-card px-4 py-3 flex flex-col gap-1 animate-fade-in">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setMobileOpen(false)}
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                    currentPath === link.path
                                        ? 'bg-primary/10 text-primary font-semibold'
                                        : 'text-foreground/70 hover:text-primary hover:bg-primary/5'
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}

                        {/* Mobile Auth Controls */}
                        <div className="border-t border-border mt-2 pt-3">
                            {isInitializing ? (
                                <div className="h-8 w-full bg-muted animate-pulse rounded-md" />
                            ) : isAuthenticated ? (
                                <div className="flex flex-col gap-2">
                                    <span className="text-xs text-muted-foreground font-mono bg-muted px-2 py-1.5 rounded-md truncate" title={principal}>
                                        {abbreviatePrincipal(principal)}
                                    </span>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => { clear(); setMobileOpen(false); }}
                                        className="border-destructive/40 text-destructive hover:bg-destructive/10 hover:text-destructive w-full"
                                    >
                                        <LogOut className="h-3.5 w-3.5 mr-1.5" />
                                        Logout
                                    </Button>
                                </div>
                            ) : (
                                <Button
                                    size="sm"
                                    onClick={() => { login(); setMobileOpen(false); }}
                                    disabled={isLoggingIn}
                                    className="bg-primary text-primary-foreground hover:bg-primary/90 w-full"
                                >
                                    {isLoggingIn ? (
                                        <Lock className="h-3.5 w-3.5 mr-1.5 animate-pulse" />
                                    ) : (
                                        <LogIn className="h-3.5 w-3.5 mr-1.5" />
                                    )}
                                    {isLoggingIn ? 'Logging in…' : 'Login'}
                                </Button>
                            )}
                        </div>
                    </div>
                )}
            </header>

            {/* Main Content */}
            <main className="flex-1">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-foreground text-primary-foreground mt-auto">
                <div className="container mx-auto px-4 py-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Brand */}
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <img
                                    src="/assets/generated/bb-homeo-care-logo.dim_512x512.png"
                                    alt="BB Homeo Care – Balanced Being"
                                    className="h-10 w-auto object-contain brightness-0 invert opacity-90"
                                />
                            </div>
                            <p className="text-sm text-primary-foreground/70 italic mt-2">
                                "We heal you inside out."
                            </p>
                            <p className="text-xs text-primary-foreground/50 mt-1">
                                Professional Homeopathic Clinic
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="font-semibold text-sm mb-3 text-primary-foreground/90 uppercase tracking-wide">Quick Links</h4>
                            <ul className="space-y-2">
                                {navLinks.map((link) => (
                                    <li key={link.path}>
                                        <Link
                                            to={link.path}
                                            className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h4 className="font-semibold text-sm mb-3 text-primary-foreground/90 uppercase tracking-wide">Contact</h4>
                            <div className="space-y-2">
                                <div className="flex items-start gap-2 text-sm text-primary-foreground/60">
                                    <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                                    <span>Kalaburagi, Karnataka, India</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-primary-foreground/60">
                                    <Phone className="h-4 w-4 shrink-0" />
                                    <span>Contact clinic for appointments</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-primary-foreground/10 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
                        <p className="text-xs text-primary-foreground/40">
                            © {new Date().getFullYear()} BB Homeo Care. All rights reserved.
                        </p>
                        <p className="text-xs text-primary-foreground/40 flex items-center gap-1">
                            Built with{' '}
                            <span className="text-red-400">♥</span>
                            {' '}using{' '}
                            <a
                                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary-foreground/60 hover:text-primary-foreground underline transition-colors"
                            >
                                caffeine.ai
                            </a>
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
