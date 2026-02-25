import { Link } from '@tanstack/react-router';
import { CalendarPlus, Users, Leaf, Shield, Heart, Star, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const features = [
    {
        icon: <Leaf className="h-6 w-6" />,
        title: 'Natural Healing',
        description: 'Holistic homeopathic treatments using natural remedies that work with your body\'s own healing mechanisms.',
    },
    {
        icon: <Shield className="h-6 w-6" />,
        title: 'Safe & Gentle',
        description: 'No side effects. Our treatments are safe for all ages — from infants to the elderly.',
    },
    {
        icon: <Heart className="h-6 w-6" />,
        title: 'Personalized Care',
        description: 'Every patient receives a customized treatment plan tailored to their unique constitution and symptoms.',
    },
    {
        icon: <Star className="h-6 w-6" />,
        title: 'Experienced Practitioners',
        description: 'Our qualified homeopathic doctors bring years of clinical experience to every consultation.',
    },
];

const highlights = [
    'Chronic disease management',
    'Skin & hair disorders',
    'Respiratory conditions',
    'Digestive disorders',
    'Pediatric care',
    'Women\'s health',
];

export default function Home() {
    return (
        <div className="animate-fade-in">
            {/* Hero Section */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/assets/generated/hero-banner.dim_1200x400.png"
                        alt="BB Homeo Care Hero"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 hero-gradient opacity-80" />
                </div>

                <div className="relative z-10 container mx-auto px-4 py-20 md:py-32 text-center">
                    <div className="flex justify-center mb-6">
                        <img
                            src="/assets/generated/bbhomeocare-logo.dim_400x200.png"
                            alt="BB Homeo Care"
                            className="h-24 md:h-32 w-auto object-contain drop-shadow-lg bg-white/90 rounded-xl px-4 py-2"
                        />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4 drop-shadow-md">
                        BB Homeo Care
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 italic font-light mb-2 drop-shadow">
                        "We heal you inside out."
                    </p>
                    <p className="text-white/75 text-base md:text-lg mb-10 max-w-xl mx-auto">
                        Professional Homeopathic Clinic · Kalaburagi, Karnataka
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold shadow-lg px-8">
                            <Link to="/booking">
                                <CalendarPlus className="h-5 w-5 mr-2" />
                                Book Consultation
                            </Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-semibold px-8">
                            <Link to="/about">
                                Learn More
                                <ArrowRight className="h-5 w-5 ml-2" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="container mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">
                        Why Choose Homeopathy?
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Homeopathy treats the whole person — mind, body, and spirit — for lasting wellness.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, idx) => (
                        <Card key={idx} className="card-hover border-border shadow-card text-center">
                            <CardContent className="pt-8 pb-6 px-6">
                                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Treatments Section */}
            <section className="bg-secondary/40 py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
                                Conditions We Treat
                            </h2>
                            <p className="text-muted-foreground mb-6 leading-relaxed">
                                At BB Homeo Care, we address a wide range of acute and chronic conditions using
                                time-tested homeopathic principles combined with modern clinical understanding.
                            </p>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {highlights.map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-2 text-sm text-foreground">
                                        <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex flex-col gap-4">
                            <Card className="card-hover border-border shadow-card">
                                <CardContent className="p-6 flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                        <CalendarPlus className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-foreground mb-1">Book a Consultation</h4>
                                        <p className="text-sm text-muted-foreground mb-3">
                                            Schedule your appointment with our experienced homeopathic doctors.
                                        </p>
                                        <Button asChild size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                                            <Link to="/booking">Book Now</Link>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="card-hover border-border shadow-card">
                                <CardContent className="p-6 flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                        <Users className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-foreground mb-1">Patient Database</h4>
                                        <p className="text-sm text-muted-foreground mb-3">
                                            Manage patient records securely with our digital database system.
                                        </p>
                                        <Button asChild size="sm" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                                            <Link to="/patients">View Records</Link>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Banner */}
            <section className="hero-gradient py-14">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-serif font-bold text-white mb-3">
                        Start Your Healing Journey Today
                    </h2>
                    <p className="text-white/80 mb-8 max-w-lg mx-auto">
                        Experience the gentle power of homeopathy. Book your consultation at BB Homeo Care, Kalaburagi.
                    </p>
                    <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold shadow-lg px-10">
                        <Link to="/booking">
                            <CalendarPlus className="h-5 w-5 mr-2" />
                            Book Your Appointment
                        </Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
