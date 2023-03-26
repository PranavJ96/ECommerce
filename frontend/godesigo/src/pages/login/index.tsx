import styles from '../../styles/Login.module.scss';
import Image from 'next/image';
import HeaderComponent from "../../components/common/header/header"
import FooterComponent from "../../components/common/footer/footer"
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
export default function Login() {
    const router = useRouter();
    const generateError = (err:any) =>
    toast(err, { hideProgressBar: true, autoClose: 2000, type: 'error' })
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;
    const onSubmit = async (value:any) => {
        try{
            const { data } = await axios.post(
                "http://localhost:5000/api/auth/login",
                { value },
                {
                  withCredentials: true,
                }
              )
            if(data.token){
            axios.defaults.headers.common = {'Authorization': `bearer ${data.token}`}
            router.replace('/')
            }
        }
        catch(er:any){
            generateError(er.response.data.msg);
        }
    }

    return (
        <div className={styles.container}>
            <HeaderComponent/>
            <div className="row">
                <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 loginImage'>
                    {/* <Image src="/static/images/login.jpg" alt="my-image" className={styles.loginImage} width={500} height={500} /> */}
                </div>
                <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 loginContainer'>
                    <div  align="center" className='col-6 loginForm'>
                        <h2 className={styles.loginTitle}>Login</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-row row form-row-spacing">
                                <div className='col-4'>
                                    <label>Email</label>
                                </div>
                                <div className='col-8'>
                                    <input type="text" {...register('email')} name="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                                    <div className="invalid-feedback">{errors.email?.message}</div>
                                </div>
                            </div>
                            <div className="form-row row form-row-spacing">
                                <div className='col-4'>
                                    <label>Password</label>
                                </div>
                                <div className='col-8'>
                                    <input type="password" {...register('password')} name="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                                    <div className="invalid-feedback">{errors.password?.message}</div>
                                </div>
                            </div>
                            <div className="form-group row form-row-spacing">
                                <div className='col-4'>
                                </div>
                                <div className='col-4'>
                                    <button type="button" className="btn btn-secondary"><a className={styles.register} href='/register'>Register</a></button>
                                    {/* <button type="button" onClick={() => reset()} className="btn btn-secondary">Register</button> */}
                                </div>
                                <div className='col-4'>
                                    <button type="submit" className="btn btn-primary mr-1">Login</button>
                                </div>
                                <ToastContainer />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <FooterComponent/>
        </div>
    )
}
  