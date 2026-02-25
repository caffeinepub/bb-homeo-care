# Specification

## Summary
**Goal:** Lock the Patient Database and Bookings List pages behind Internet Identity authentication, so only logged-in users can access admin data.

**Planned changes:**
- Add a Login/Logout control in the shared Layout header using the existing `useInternetIdentity` hook; show abbreviated principal and Logout button when authenticated, Login button when not.
- Protect the Patient Database page (`/patient-database`): unauthenticated visitors see a lock/access-denied screen with a prominent "Login with Internet Identity" button instead of patient records or the add-patient form.
- Protect the Bookings List page (`/bookings-list`): unauthenticated visitors see a lock/access-denied screen with a prominent "Login with Internet Identity" button instead of booking cards.
- After successful login, both protected pages become fully accessible; logging out re-locks them.
- The public Booking form (`/booking`) remains accessible to unauthenticated users.

**User-visible outcome:** Admin pages (Patient Database and Bookings List) are hidden behind an Internet Identity login gate. The header always shows the current auth state, and only authenticated users can view or interact with admin data.
