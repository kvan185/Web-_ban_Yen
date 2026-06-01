import { redirect } from 'next/navigation';

export default function ManagerOrdersRedirectPage() {
  redirect('/manager/order-history');
}
