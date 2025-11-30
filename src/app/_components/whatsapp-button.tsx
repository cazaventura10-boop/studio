'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

function WhatsAppIcon() {
    return (
        <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.04 2C6.58 2 2.13 6.45 2.13 12C2.13 14.06 2.76 16.01 3.86 17.6L2.52 22L7.02 20.62C8.54 21.6 10.25 22.13 12.04 22.13C17.5 22.13 22 17.68 22 12.13C22 6.58 17.5 2 12.04 2ZM12.04 20.38C10.39 20.38 8.81 19.82 7.51 18.86L7.14 18.63L4.65 19.33L5.35 16.92L5.1 16.54C4.01 15.08 3.38 13.25 3.38 11.25C3.38 7.39 7.32 4.25 12.04 4.25C14.34 4.25 16.42 5.25 17.97 6.81C19.52 8.36 20.52 10.45 20.52 12.75C20.52 16.61 16.76 20.38 12.04 20.38ZM17.99 14.53C17.74 14.41 16.53 13.85 16.28 13.76C16.03 13.67 15.86 13.62 15.69 13.88C15.52 14.13 15.01 14.73 14.84 14.9C14.67 15.07 14.5 15.09 14.25 15C14 14.91 13.1 14.64 12.02 13.7C11.16 12.96 10.58 12.05 10.43 11.8C10.28 11.55 10.42 11.41 10.54 11.29C10.65 11.18 10.79 11 10.91 10.85C11.03 10.7 11.08 10.6 11.18 10.43C11.28 10.26 11.23 10.11 11.16 10C11.09 9.89 10.53 8.49 10.28 7.9C10.04 7.31 9.79 7.38 9.61 7.37C9.46 7.37 9.24 7.36 9.04 7.36C8.84 7.36 8.54 7.43 8.29 7.68C8.04 7.93 7.43 8.5 7.43 9.75C7.43 11 8.32 12.22 8.44 12.39C8.56 12.56 10.43 15.51 13.38 16.82C14.12 17.15 14.7 17.32 15.15 17.44C15.82 17.61 16.42 17.58 16.84 17.51C17.31 17.43 18.25 16.88 18.47 16.29C18.69 15.7 18.69 15.2 18.62 15.07C18.55 14.95 18.24 14.65 17.99 14.53Z"
            />
        </svg>
    );
}


export function WhatsAppButton() {
  const phoneNumber = "1234567890"; // Reemplaza con tu número
  const message = "Hola, me gustaría obtener más información."; // Mensaje predefinido
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <Button
      asChild
      className="fixed bottom-6 right-6 h-16 w-16 rounded-full bg-green-500 text-white shadow-lg transition-transform hover:bg-green-600 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 z-50"
      aria-label="Contactar por WhatsApp"
    >
      <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer">
        <WhatsAppIcon />
      </Link>
    </Button>
  );
}