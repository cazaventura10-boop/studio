import { ContactForm } from '@/app/_components/contact-form';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactoPage() {
  return (
    <div className="bg-secondary">
        <div className="container py-12 md:py-24 px-4">
        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold font-headline tracking-tight">Contacto</h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            ¿Tienes alguna pregunta o comentario? Nos encantaría saber de ti.
            </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="space-y-8 flex flex-col justify-center">
                <div className="flex items-start gap-4">
                    <div className="bg-primary text-primary-foreground p-3 rounded-md flex-shrink-0">
                        <MapPin className="h-6 w-6"/>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold font-headline">Nuestra Oficina</h3>
                        <p className="text-muted-foreground">Calle Falsa 123, 08001 Barcelona, España</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="bg-primary text-primary-foreground p-3 rounded-md flex-shrink-0">
                        <Mail className="h-6 w-6"/>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold font-headline">Escríbenos</h3>
                        <p className="text-muted-foreground">hola@deporteyaventura.es</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="bg-primary text-primary-foreground p-3 rounded-md flex-shrink-0">
                        <Phone className="h-6 w-6"/>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold font-headline">Llámanos</h3>
                        <p className="text-muted-foreground">(+34) 93 123 45 67</p>
                    </div>
                </div>
            </div>

            <div>
            <ContactForm />
            </div>
        </div>
        </div>
    </div>
  );
}
