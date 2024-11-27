// import React, { useState } from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import { useMutation } from '@tanstack/react-query';
// import * as Yup from 'yup';
// import { toast } from 'react-hot-toast';
// import styles from './QuizQuestionForm.module.css';
// import { quizTopicList } from '../../assets/data/quiz.data';

// function QuizQuestionForm() {
//   const [isFormOpen, setIsFormOpen] = useState(false);
//   const [preview, setPreview] = useState(null);
//   const [successMessage, setSuccessMessage] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   const { mutate, isLoading } = useMutation({
//     mutationFn: async (data) => {
//       const formData = new FormData();
//       formData.append('name', data.company);
//       formData.append('requirements', data.about);
//       formData.append('avatar', data.image);

//       const response = await fetch('http://localhost:8080/company/register', {
//         method: 'POST',
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       return response.json();
//     },
//     onError: (error) => {
//       // toast.error('Internal Server Error');
//       // setErrorMessage('An error occurred. Please try again.');
//       console.error('Error:', error);
//     },
//     onSuccess: (data, variables, context) => {
//       toast.success(data.message);
//       setSuccessMessage(data.message);
//       context.resetForm();  // Reset the form using context
//       setPreview(null);     // Clear the image preview
//     },
//   });

//   const initialValues = {
//     company: '',
//     about: '',
//     image: null,
//   };

//   const validationSchema = Yup.object({
//     company: Yup.string()
//       .max(50, 'Company name must be less than 50 characters')
//       .required('Company is required'),
//     about: Yup.string()
//       .max(500, 'About must be less than 500 characters')
//       .required('About is required'),
//     image: Yup.mixed().required('An image is required'),
//   });

//   const handleToggleForm = () => {
//     setIsFormOpen((state) => !state);
//   };

//   const handleChange = (event, setFieldValue) => {
//     const file = event.currentTarget.files[0];
//     setFieldValue('image', file);
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setPreview(reader.result);
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleSubmit = async (values, { resetForm }) => {
//     mutate(values, {
//       onSuccess: (data) => {
//         resetForm();
//         setPreview(null);
//       }
//     });
//   };

//   return (
//     <div className={styles.QuizQuestionForm}>
//       <button
//         type="button"
//         onClick={handleToggleForm}
//         className={`default-button ${styles.toggleFormButton}`}
//       >
//         {isFormOpen ? 'Close Form' : 'Open Form'}
//       </button>

//       <div
//         className={`${styles.formikContainer} ${
//           isFormOpen ? styles.formikContainerOpen : ''
//         }`}
//       >
//         <Formik
//           initialValues={initialValues}
//           validationSchema={validationSchema}
//           onSubmit={handleSubmit}
//         >
//           {(formik) => (
//             <Form className={styles.form}>
//               <h2 className={styles.title}>Create Form</h2>

//               <div
//                 className={`${styles.inputField} ${
//                   formik.touched.company && formik.errors.company
//                     ? styles.inputFieldError
//                     : ''
//                 }`}
//               >
//                 <label htmlFor="company">
//                   {formik.touched.company && formik.errors.company
//                     ? formik.errors.company
//                     : 'Company'}
//                   <span className="required">*</span>
//                   <Field
//                     type="text"
//                     name="company"
//                     placeholder="Company name"
//                   />
//                   <ErrorMessage name="company" component="div" />
//                 </label>
//               </div>

//               <div
//                 className={`${styles.inputField} ${
//                   formik.touched.about && formik.errors.about
//                     ? styles.inputFieldError
//                     : ''
//                 }`}
//               >
//                 <label htmlFor="about">
//                   {formik.touched.about && formik.errors.about
//                     ? formik.errors.about
//                     : 'About'}
//                   <span className="required">*</span>
//                   <Field
//                     as="textarea"
//                     name="about"
//                     placeholder="About"
//                   />
//                   <ErrorMessage name="about" component="div" />
//                 </label>
//               </div>

//               <div
//                 className={`${styles.inputField} ${
//                   formik.touched.image && formik.errors.image
//                     ? styles.inputFieldError
//                     : ''
//                 }`}
//               >
//                 <label htmlFor="image">
//                   {formik.touched.image && formik.errors.image
//                     ? formik.errors.image
//                     : 'Image'}
//                   <span className="required">*</span>
//                   <input
//                     type="file"
//                     onChange={(event) => handleChange(event, formik.setFieldValue)}
//                     onBlur={formik.handleBlur}
//                   />
//                   {preview && <img src={preview} alt="Image preview" />}
//                   <ErrorMessage name="image" component="div" />
//                 </label>
//               </div>

//               <div className={styles.column}>
//                 <button
//                   type="submit"
//                   disabled={isLoading}
//                   className={`default-button ${styles.registerButton}`}
//                 >
//                   Create Form
//                 </button>
//                 <button
//                   type="reset"
//                   disabled={isLoading}
//                   onClick={() => {
//                     formik.resetForm();
//                     setPreview(null);
//                   }}
//                   className={`default-button ${styles.resetButton}`}
//                 >
//                   Reset Form
//                 </button>
//               </div>
//             </Form>
//           )}
//         </Formik>
//       </div>
//     </div>
//   );
// }

// export default QuizQuestionForm;


import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useMutation } from '@tanstack/react-query';
import * as Yup from 'yup';
import { toast } from 'react-hot-toast';
import styles from './QuizQuestionForm.module.css';

function QuizQuestionForm({ addCompany }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [preview, setPreview] = useState(null);

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data) => {
      const formData = new FormData();
      formData.append('name', data.company);
      formData.append('requirements', data.about);
      formData.append('avatar', data.image);

      const response = await fetch('http://localhost:8080/company/register', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return response.json();
    },
    onError: (error) => {
      console.error('Error:', error);
    },
    onSuccess: (data, variables, context) => {
      toast.success(data.message);
      addCompany(data.data);
      context.resetForm(); // Reset the form using context
      setPreview(null);    // Clear the image preview
    },
  });

  const initialValues = {
    company: '',
    about: '',
    image: null,
  };

  const validationSchema = Yup.object({
    company: Yup.string()
      .max(50, 'Company name must be less than 50 characters')
      .required('Company is required'),
    about: Yup.string()
      .max(500, 'About must be less than 500 characters')
      .required('About is required'),
    image: Yup.mixed().required('An image is required'),
  });

  const handleToggleForm = () => {
    setIsFormOpen((state) => !state);
  };

  const handleChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    setFieldValue('image', file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (values, { resetForm }) => {
    mutate(values, {
      onSuccess: (data) => {
        resetForm();
        setPreview(null);
      }
    });
  };

  return (
    <div className={styles.QuizQuestionForm}>
      <button
        type="button"
        onClick={handleToggleForm}
        className={`default-button ${styles.toggleFormButton}`}
      >
        {isFormOpen ? 'Close Form' : 'Open Form'}
      </button>

      <div
        className={`${styles.formikContainer} ${
          isFormOpen ? styles.formikContainerOpen : ''
        }`}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form className={styles.form}>
              <h2 className={styles.title}>Create Form</h2>

              <div
                className={`${styles.inputField} ${
                  formik.touched.company && formik.errors.company
                    ? styles.inputFieldError
                    : ''
                }`}
              >
                <label htmlFor="company">
                  {formik.touched.company && formik.errors.company
                    ? formik.errors.company
                    : 'Company'}
                  <span className="required">*</span>
                  <Field
                    type="text"
                    name="company"
                    placeholder="Company name"
                  />
                  <ErrorMessage name="company" component="div" />
                </label>
              </div>

              <div
                className={`${styles.inputField} ${
                  formik.touched.about && formik.errors.about
                    ? styles.inputFieldError
                    : ''
                }`}
              >
                <label htmlFor="about">
                  {formik.touched.about && formik.errors.about
                    ? formik.errors.about
                    : 'About'}
                  <span className="required">*</span>
                  <Field
                    as="textarea"
                    name="about"
                    placeholder="About"
                  />
                  <ErrorMessage name="about" component="div" />
                </label>
              </div>

              <div
                className={`${styles.inputField} ${
                  formik.touched.image && formik.errors.image
                    ? styles.inputFieldError
                    : ''
                }`}
              >
                <label htmlFor="image">
                  {formik.touched.image && formik.errors.image
                    ? formik.errors.image
                    : 'Image'}
                  <span className="required">*</span>
                  <input
                    type="file"
                    onChange={(event) => handleChange(event, formik.setFieldValue)}
                    onBlur={formik.handleBlur}
                  />
                  {preview && <img src={preview} alt="Image preview" />}
                  <ErrorMessage name="image" component="div" />
                </label>
              </div>

              <div className={styles.column}>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`default-button ${styles.registerButton}`}
                >
                  Create Form
                </button>
                <button
                  type="reset"
                  disabled={isLoading}
                  onClick={() => {
                    formik.resetForm();
                    setPreview(null);
                  }}
                  className={`default-button ${styles.resetButton}`}
                >
                  Reset Form
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default QuizQuestionForm;
