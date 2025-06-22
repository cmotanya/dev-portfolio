// types.ts

export interface Service {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType; // For Lucide icons
}

export interface Item {
  id: string;
  name: string;
  description: string;
  unit: string; // e.g., "per camera", "per meter", "per hour", "fixed fee"
  minQuantity?: number; // Optional: Minimum quantity allowed
  maxQuantity?: number; // Optional: Maximum quantity allowed
  isSystemType?: boolean; // Indicates if this item is a primary system choice (e.g., IP System, Analog System for CCTV)
  systemType?: "ip" | "analog" | "wireless"; // For items, indicates which CCTV system they are compatible with
  category?: string; // For grouping items within a service (e.g., "Camera", "Recorder", "Cabling")
}

export interface SelectedItem extends Item {
  quantity: number;
}

export interface QuoteRequest {
  serviceId: string;
  selectedItems: SelectedItem[]; // The list of items the client has selected
  notes?: string;
  contact: {
    name: string;
    email: string;
    phone: string;
  };
}
