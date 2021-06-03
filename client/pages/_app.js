import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import '../public/css/styles.css';
import 'react-toastify/dist/ReactToastify.css';

import { Provider } from '../context';
import { ToastContainer } from 'react-toastify';
import TopNav from '../components/TopNav';

const MyApp = ({ Component, pageProps }) => {
	return (
		<Provider>
			<TopNav />
			<Component {...pageProps} />
			<ToastContainer position="top-center" />
		</Provider>
	);
};

export default MyApp;
