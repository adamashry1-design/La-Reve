// Configure the restaurant's WhatsApp number here (international format, no + or spaces)
export const RESTAURANT_WHATSAPP = "201101234407"; // Egypt
export const RESTAURANT_DISPLAY = "+20 110 123 4407";

export interface ReservationData {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
}

function formatReservationDate(dateStr: string): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * Builds a WhatsApp message for a reservation request (English & Arabic)
 */
export function buildReservationMessage(reservation: ReservationData): string {
  const lines = [
    "━━━━━━━━━━━━━━━━━━━━━━━━",
    "*LE RÊVE RESERVATION REQUEST*",
    "━━━━━━━━━━━━━━━━━━━━━━━━",
    "",
    "*Guest Information*",
    `Name: ${reservation.name}`,
    `Phone: ${reservation.phone}`,
    `Number of Guests: ${reservation.guests}`,
    "",
    "*Reservation Details*",
    `Date: ${formatReservationDate(reservation.date)}`,
    `Time: ${reservation.time}`,
    "",
  ];

  return lines.filter(Boolean).join("\n");
}

/**
 * Opens WhatsApp with the restaurant's number and a prefilled reservation message.
 * In production this would be replaced with a server-side call to the
 * WhatsApp Cloud API (graph.facebook.com/v20.0/{phone-id}/messages) using
 * an approved message template. For client-only deployments, wa.me deep
 * links are the standard, reliable, zero-backend approach.
 */
export function notifyReservationWhatsApp(reservation: ReservationData) {
  const text = buildReservationMessage(reservation);
  const url = `https://wa.me/${RESTAURANT_WHATSAPP}?text=${encodeURIComponent(text)}`;
  // Open in a new tab so the user stays on the page
  window.open(url, "_blank", "noopener,noreferrer");
  return url;
}

/**
 * Opens WhatsApp with a custom message
 */
export function openWhatsAppChat(message: string = "Hello, I'd like to inquire about Le Rêve.\n\nمرحبا، أود الاستفسار عن لو ريف.") {
  const url = `https://wa.me/${RESTAURANT_WHATSAPP}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
  return url;
}

