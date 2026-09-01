// app/admin/dashboard/page.tsx — Redirect to 404
import { notFound } from 'next/navigation';

export default function DeprecatedAdminDashboard() {
  notFound();
}
