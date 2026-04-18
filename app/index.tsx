import { ROUTES } from '@/presentation/navigation/Routes';
import { Redirect } from 'expo-router';

export default function Index() {
  return <Redirect href={ROUTES.TABS} />;
}
