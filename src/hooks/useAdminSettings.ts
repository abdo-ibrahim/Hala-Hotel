import { useState, useEffect } from "react";

interface AdminSettings {
  hasTermsAndConditions: boolean;
  hasPrivacyPolicy: boolean;
  whatsappNumber: string;
  contactEmail: string;
}

// Mock admin settings - in a real app, this would come from your backend API
const mockAdminSettings: AdminSettings = {
  hasTermsAndConditions: true,
  hasPrivacyPolicy: true,
  whatsappNumber: "+966501234567", // Saudi Arabia format
  contactEmail: "info@hallahotel.com",
};

export const useAdminSettings = () => {
  const [settings, setSettings] = useState<AdminSettings>(mockAdminSettings);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call to fetch admin settings
    const fetchAdminSettings = async () => {
      setLoading(true);
      try {
        // In a real app, you would make an API call here
        // const response = await fetch('/api/admin/settings');
        // const data = await response.json();

        // For now, we'll use mock data
        await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay
        setSettings(mockAdminSettings);
        setError(null);
      } catch (err) {
        setError("Failed to load admin settings");
        console.error("Error fetching admin settings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminSettings();
  }, []);

  return {
    settings,
    loading,
    error,
    refetch: () => {
      // Function to refetch settings if needed
      setLoading(true);
      setTimeout(() => {
        setSettings(mockAdminSettings);
        setLoading(false);
      }, 500);
    },
  };
};
