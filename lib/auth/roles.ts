export const Role = {
  ADMIN: "admin",
  STAFF: "staff",
  USER: "user",
} as const;

export type Role = (typeof Role)[keyof typeof Role];

export function getDashboardByRole(role?: string | null) {
  switch (role) {
    case Role.ADMIN:
      return "/admin";

    case Role.STAFF:
      return "/staff";

    case Role.USER:
      return "/user";

    default:
      return "/user";
  }
}