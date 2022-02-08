import styles from '../styles/Login.module.css';
import stylesBtn from '../styles/Buttons.module.css';
import Link from 'next/link';
import NavButton from '../components/NavButton';
import { useUser } from '@auth0/nextjs-auth0';
import { login } from '../lib/methods'
import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();
  const { user, error, isLoading } = useUser();
  if (isLoading) return <div>Loading...</div>
  if(error) return <div>{error.message}</div>


  const handleLogin = async () => {
    if (user) {
      const res = await login(user);
      localStorage.setItem('accessToken', res.data.accessToken);
      if (!res.data.isBudget) router.push('/user/createbudget')
      else router.push('/user');
    }
  }

  handleLogin();

  return (
    <div className={styles.container}>
      <header className={styles.mainHeader}>
        <h1>SLICE</h1>
        <h4>Meal planning & budgeting</h4>
      </header>
      <div className={styles.mainLoginContainer}>
        <Link href='/api/auth/login' passHref>
          <NavButton
            className={`${stylesBtn.btn} ${stylesBtn.login}`}
            type='button'
            children='Login/Register'
          />
        </Link>
      </div>
    </div>
  );
};

export default Home;
