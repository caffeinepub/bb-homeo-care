import { MapPin, Phone, Clock, Leaf, Heart, Shield, Award, Users, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';

const values = [
    {
        icon: <Leaf className="h-6 w-6" />,
        title: 'Natural & Holistic',
        description: 'We believe in treating the whole person — body, mind, and spirit — using the gentle power of nature.',
    },
    {
        icon: <Heart className="h-6 w-6" />,
        title: 'Compassionate Care',
        description: 'Every patient is treated with empathy, dignity, and personalized attention from our dedicated team.',
    },
    {
        icon: <Shield className="h-6 w-6" />,
        title: 'Safe Treatment',
        description: 'Homeopathic remedies are non-toxic, non-addictive, and safe for patients of all ages.',
    },
    {
        icon: <Award className="h-6 w-6" />,
        title: 'Clinical Excellence',
        description: 'Our practitioners follow evidence-based homeopathic protocols for consistent, reliable outcomes.',
    },
];

const conditions = [
    'Allergies & Asthma', 'Arthritis & Joint Pain', 'Skin Disorders (Eczema, Psoriasis)',
    'Digestive Issues', 'Migraine & Headaches', 'Anxiety & Stress',
    'Thyroid Disorders', 'Pediatric Ailments', 'Women\'s Health',
    'Hair Loss & Dandruff', 'Kidney Stones', 'Chronic Fatigue',
];

export default function About() {
    return (
        <div className="animate-fade-in">
            {/* Hero */}
            <section className="hero-gradient py-16 md:py-24">
                <div className="container mx-auto px-4 text-center">
                    <Badge className="bg-white/20 text-white border-white/30 mb-4 text-sm px-4 py-1">
                        Est. in Kalaburagi, Karnataka
                    </Badge>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
                        About BB Homeo Care
                    </h1>
                    <p className="text-white/85 text-lg max-w-2xl mx-auto leading-relaxed">
                        A trusted homeopathic clinic dedicated to natural healing and holistic wellness,
                        serving the community of Kalaburagi with compassion and expertise.
                    </p>
                </div>
            </section>

            {/* Mission */}
            <section className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
                            Our Mission
                        </h2>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            At <strong className="text-foreground">BB Homeo Care</strong>, our mission is to provide
                            accessible, effective, and compassionate homeopathic healthcare to every patient who walks
                            through our doors. We are committed to healing you — not just your symptoms, but your
                            entire being.
                        </p>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            Founded on the principles of classical homeopathy, we believe that the body has an
                            innate ability to heal itself when given the right support. Our role is to stimulate
                            that natural healing process through carefully selected homeopathic remedies.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            Our tagline — <em className="text-primary font-medium">"We heal you inside out"</em> —
                            reflects our philosophy: true healing begins from within.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { icon: <Users className="h-7 w-7" />, label: 'Patients Served', value: '1000+' },
                            { icon: <Star className="h-7 w-7" />, label: 'Years of Experience', value: '10+' },
                            { icon: <Leaf className="h-7 w-7" />, label: 'Natural Remedies', value: '500+' },
                            { icon: <Heart className="h-7 w-7" />, label: 'Conditions Treated', value: '50+' },
                        ].map((stat, idx) => (
                            <Card key={idx} className="card-hover border-border shadow-card text-center">
                                <CardContent className="pt-6 pb-5">
                                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-3">
                                        {stat.icon}
                                    </div>
                                    <div className="text-2xl font-bold text-foreground font-serif">{stat.value}</div>
                                    <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            <Separator className="container mx-auto" />

            {/* Values */}
            <section className="bg-secondary/30 py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">
                            Our Core Values
                        </h2>
                        <p className="text-muted-foreground max-w-xl mx-auto">
                            Everything we do is guided by these principles that put patients first.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, idx) => (
                            <Card key={idx} className="card-hover border-border shadow-card">
                                <CardContent className="pt-7 pb-6 px-5">
                                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                                        {value.icon}
                                    </div>
                                    <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Approach */}
            <section className="container mx-auto px-4 py-16">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6 text-center">
                        Our Approach to Homeopathy
                    </h2>
                    <div className="space-y-6">
                        {[
                            {
                                step: '01',
                                title: 'Comprehensive Consultation',
                                desc: 'We begin with an in-depth consultation to understand not just your physical symptoms, but your emotional state, lifestyle, and medical history. This holistic assessment forms the foundation of your treatment plan.',
                            },
                            {
                                step: '02',
                                title: 'Individualized Remedy Selection',
                                desc: 'Based on your unique symptom picture, we select the most appropriate homeopathic remedy from thousands of proven medicines. No two patients receive the same treatment — because no two people are the same.',
                            },
                            {
                                step: '03',
                                title: 'Ongoing Monitoring & Adjustment',
                                desc: 'We closely monitor your progress and adjust remedies as needed. Homeopathy is a dynamic process — your treatment evolves as you heal.',
                            },
                            {
                                step: '04',
                                title: 'Lifestyle & Wellness Guidance',
                                desc: 'Beyond remedies, we provide guidance on diet, lifestyle, and preventive care to support your long-term health and well-being.',
                            },
                        ].map((item) => (
                            <div key={item.step} className="flex gap-5">
                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold font-serif">
                                    {item.step}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Conditions */}
            <section className="bg-secondary/30 py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-serif font-bold text-foreground mb-3 text-center">
                        Conditions We Treat
                    </h2>
                    <p className="text-muted-foreground text-center mb-8 max-w-xl mx-auto">
                        Our clinic has successfully treated a wide range of acute and chronic conditions.
                    </p>
                    <div className="flex flex-wrap gap-3 justify-center max-w-3xl mx-auto">
                        {conditions.map((condition) => (
                            <Badge
                                key={condition}
                                variant="secondary"
                                className="text-sm px-4 py-1.5 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
                            >
                                {condition}
                            </Badge>
                        ))}
                    </div>
                </div>
            </section>

            {/* Location & Contact */}
            <section className="container mx-auto px-4 py-16">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-3xl font-serif font-bold text-foreground mb-8 text-center">
                        Visit Us
                    </h2>
                    <Card className="border-border shadow-card">
                        <CardContent className="p-8 space-y-5">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                    <MapPin className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-foreground mb-1">Location</h4>
                                    <p className="text-muted-foreground text-sm">
                                        BB Homeo Care<br />
                                        Kalaburagi (Gulbarga), Karnataka<br />
                                        India — 585 101
                                    </p>
                                </div>
                            </div>
                            <Separator />
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                    <Clock className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-foreground mb-1">Clinic Hours</h4>
                                    <div className="text-sm text-muted-foreground space-y-1">
                                        <p>Monday – Saturday: 9:00 AM – 7:00 PM</p>
                                        <p>Sunday: 10:00 AM – 2:00 PM</p>
                                    </div>
                                </div>
                            </div>
                            <Separator />
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                    <Phone className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-foreground mb-1">Appointments</h4>
                                    <p className="text-sm text-muted-foreground">
                                        Book your consultation online or visit us directly at the clinic.
                                    </p>
                                    <Button asChild size="sm" className="mt-3 bg-primary text-primary-foreground hover:bg-primary/90">
                                        <Link to="/booking">Book Online</Link>
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </div>
    );
}
