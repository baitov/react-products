import { redirect } from 'next/navigation';

export default function ProductsIndex() {
  // Серверный редирект на главную страницу
  redirect('/');
}
