'use server';

export type User = {
  name: string;
  initials: string;
  email: string;
  title: string;
  role: string;
};

const mockUser: User = {
  name: "Sarah Johnson",
  initials: "SJ",
  email: "sarah.j@example.com",
  title: "Financial Controller",
  role: "Admin",
};

export async function getMockUser(): Promise<User> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 50));
  return mockUser;
}
