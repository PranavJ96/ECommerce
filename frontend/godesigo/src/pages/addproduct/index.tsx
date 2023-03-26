import styles from '../../styles/AddProduct.module.scss';
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
    const MAX_FILE_SIZE = 102400*5; //500KB
    const getExtension = (fileName:any) =>{
        return fileName.split('.').pop()
    }
    const generateError = (err:any) =>
    toast(err, { hideProgressBar: true, autoClose: 2000, type: 'error' })
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Name is required')
            .min(3, 'Name must be at least 3 characters'),
        description: Yup.string()
            .min(6, 'Description must be at least 6 characters')
            .max(200, 'Description must be within 200 characters')
            .required('Description is required'),
        price: Yup.string()
            .matches(/^\d*\.?\d*$/, 'Please enter in the example format Ex: 12.34')
            .required('Cost Price is required'),
        size: Yup.string()
            .matches(/^\d*[1-9]\d*$/, 'Please only input numbers')
            // .positive('Please enter a positive number')
            // .integer('Please only input numbers')
            .required('Area is required'),
        quantity: Yup.number()
            .positive('only positive values are accepted')
            .integer('Input should be a whole number')
            .min(1,'You need to add atleast 1 product')
            .required('quantity is required'),
        image: Yup
            .mixed()
            .required("Image is required")
            .test({
                message: 'Please provide a supported file type',
                test: (file, context) => {
                    if(file[0]!==undefined){
                      const isValid = ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp'].includes(getExtension(file[0]?.name));
                      if (!isValid) context?.createError();
                      return isValid;
                    }
                }
              })
              .test({
                  message: 'Max allowed size is 500KB',
                  test: (file, context) => {
                      if(file[0]!==undefined){
                        const isAllowed = file[0].size<=MAX_FILE_SIZE
                        if (!isAllowed) context?.createError();
                        return isAllowed;
                      }
                  }
                })
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;
    const onSubmit = async (value:any) => {
        debugger
        // try{
        //     const { data } = await axios.post(
        //         "http://localhost:5000/api/auth/login",
        //         { value },
        //         {
        //           withCredentials: true,
        //         }
        //       )
        //     if(data.token){
        //     axios.defaults.headers.common = {'Authorization': `bearer ${data.token}`}
        //     router.replace('/')
        //     }
        // }
        // catch(er:any){
        //     generateError(er.response.data.msg);
        // }
    }

    return (
        <div className={styles.container}>
            <HeaderComponent/>
            <div className="row addProductContainer">
                <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 loginContainer'>
                    <div align="center" className='col-6 addProductForm'>
                    <h2 className={styles.addProductTitle}>Add Product</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-row row form-row-spacing">
                                <div className='col-4'>
                                    <label>Name :</label>
                                </div>
                                <div className='col-8'>
                                    <input type="text" {...register('name')} placeholder="Please enter the product name." name="name" className={`form-control ${errors.name ? 'is-invalid' : ''}`} />
                                    <div className="invalid-feedback">{errors.name?.message}</div>
                                </div>
                            </div>
                            <div className="form-row row form-row-spacing">
                                <div className='col-4'>
                                    <label>Description :</label>
                                </div>
                                <div className='col-8'>
                                    <textarea type="text" {...register('description')} placeholder="Please enter the product description here." name="description" className={`form-control ${errors.description ? 'is-invalid' : ''}`} />
                                    <div className="invalid-feedback">{errors.description?.message}</div>
                                </div>
                            </div>
                            <div className="form-row row form-row-spacing">
                                <div className='col-4'>
                                    <label>Price :</label>
                                </div>
                                <div className='col-8'>
                                    <input type="text" {...register('price')} name="price" placeholder="Please enter the product price." className={`form-control ${errors.price ? 'is-invalid' : ''}`} />
                                    <div className="invalid-feedback">{errors.price?.message}</div>
                                </div>
                            </div>
                            <div className="form-row row form-row-spacing">
                                <div className='col-4'>
                                    <label>Quantity :</label>
                                </div>
                                <div className='col-8'>
                                    <input type="text" {...register('quantity')} name="quantity" placeholder="Enter the product quantity." className={`form-control ${errors.quantity ? 'is-invalid' : ''}`} />
                                    <div className="invalid-feedback">{errors.quantity?.message}</div>
                                </div>
                            </div>
                            <div className="form-row row form-row-spacing">
                                <div className='col-4'>
                                    <label>Size (m2) :</label>
                                </div>
                                <div className='col-8'>
                                    <input type="text" {...register('size')} name="size" placeholder="Please enter the product size." className={`form-control ${errors.size ? 'is-invalid' : ''}`} />
                                    <div className="invalid-feedback">{errors.size?.message}</div>
                                </div>
                            </div>
                            <div className="form-row row form-row-spacing">
                                <div className='col-4'>
                                    <label>Image :</label>
                                </div>
                                <div className='col-8'>
                                    <input type="file" {...register('image')} name="image" className={`form-control ${errors.image ? 'is-invalid' : ''}`} />
                                    <div className="invalid-feedback">{errors.image?.message}</div>
                                </div>
                            </div>
                            <div className="form-group row form-row-spacing">
                                <div className='col-3'>
                                </div>
                                <div className='col-9'>
                                    <button type="submit" className="btn btn-primary mr-1">Add Product</button>
                                </div>
                                <ToastContainer />
                            </div>
                        </form>
                    </div>

                </div>
                <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 sideImageAddProduct'>
                    {/* <Image src="/static/images/addProduct.jpg" alt="my-image" className={styles.loginImage} width={500} height={500} /> */}
                </div>
            </div>
            <FooterComponent/>
        </div>
    )
}
  