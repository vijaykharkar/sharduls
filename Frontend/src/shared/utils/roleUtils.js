/**
 * Centralized role utilities.
 * All role-based routing decisions MUST use these helpers —
 * never hardcode portal paths directly in components.
 */

/** Map of normalized role → home route */
export const ROLE_HOME = {
  buyer: '/buyer',
  supplier: '/supplier/dashboard',
  admin: '/admin',
  superadmin: '/admin',
};

/** Map of portal prefix → roles allowed in that portal */
export const PORTAL_ROLES = {
  buyer: ['buyer'],
  supplier: ['supplier'],
  admin: ['admin', 'superadmin'],
};

/**
 * Returns the home route for a given role.
 * Falls back to '/' for unknown roles.
 */
export const getRoleHome = (role) => ROLE_HOME[(role || '').toLowerCase()] || '/';

/**
 * Returns true if the role is allowed to access the given portal.
 * @param {string} portal - 'buyer' | 'supplier' | 'admin'
 * @param {string} role   - user role from Redux auth state
 */
export const canAccessPortal = (portal, role) => {
  const allowed = PORTAL_ROLES[portal] || [];
  return allowed.includes((role || '').toLowerCase());
};
