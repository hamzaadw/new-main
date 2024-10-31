import { Formik } from 'formik';
import { Input, Select, Form, Button, Upload, Checkbox } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { collection, addDoc, doc, updateDoc, Timestamp } from "firebase/firestore"; 
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from '../configirations/firebase';

const handleSizeChange = (checkedValues, setFieldValue) => {
  setFieldValue('sizes', checkedValues);
};

const handleChanger = (value, setFieldValue) => {
  setFieldValue('category', value);
};

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const submit = async (values) => {
  try {
    console.log('Starting file uploads...');
    const uploadPromises = values.upload.map(file => {
      const storageRef = ref(storage, `products/${file.originFileObj.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file.originFileObj);

      return new Promise((resolve, reject) => {
        uploadTask.on('state_changed', 
          (snapshot) => {},
          (error) => {
            console.error("Error uploading file:", error);
            reject(error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          }
        );
      });
    });

    const uploadURLs = await Promise.all(uploadPromises);

    console.log('File upload successful, URLs:', uploadURLs);

    const docRef = await addDoc(collection(db, "Product"), {
      name: values.name,
      price: values.price,
      rating: values.rating,
      category: values.category,
      description: values.description,
      image: uploadURLs,
      sizes: values.sizes,
      soldProducts: values.soldProducts,
      productDate: Timestamp.now()
    });

    console.log("Document added with ID: ", docRef.id);
    await updateDoc(doc(db, "Product", docRef.id), { id: docRef.id });
    console.log("Document updated with ID field");

  } catch (e) {
    console.error("Error in submission process:", e.message);
  }
};

const AddItems = () => (
  <div className='container-fluid'>
    <div className='row'>
      <div className='col-10 mx-auto'>
        <div>
          <h1>Add a new product</h1>
          <Formik
            initialValues={{ category: '', name: '', price: '', rating: '', description: '', upload: [], sizes: [], soldProducts: '' }}
            validate={values => {
              const errors = {};
              if (!values.name) errors.name = 'Required';
              if (!values.price) errors.price = 'Required';
              if (!values.rating) errors.rating = 'Required';
              if (!values.category) errors.category = 'Required';
              if (!values.description) errors.description = 'Required';
              if (!values.upload.length) errors.upload = 'Required';
              if (!values.sizes.length) errors.sizes = 'Required';
              if (!values.soldProducts) errors.soldProducts = 'Required';
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              submit(values).then(() => {
                alert('Form submitted successfully!');
                setSubmitting(false);
              }).catch((error) => {
                console.error('Form submission error: ', error);
                setSubmitting(false);
              });
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit}>
                <Form.Item label="Item Name" help={errors.name && touched.name && errors.name}>
                  <Input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    placeholder="Enter item name"
                  />
                </Form.Item>
                <Form.Item label="Price" help={errors.price && touched.price && errors.price}>
                  <Input
                    type="number"
                    name="price"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.price}
                    placeholder="Enter item price"
                  />
                </Form.Item>
                <Form.Item label="Rating" help={errors.rating && touched.rating && errors.rating}>
                  <Input
                    type="number"
                    name="rating"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.rating}
                    placeholder="Enter rating"
                  />
                </Form.Item>
                <Form.Item label="Category" help={errors.category && touched.category && errors.category}>
                  <Select
                    onBlur={handleBlur}
                    value={values.category}
                    name="category"
                    style={{ width: 120 }}
                    onChange={(value) => handleChanger(value, setFieldValue)}
                    options={[
                      { value: 'WomenPants', label: 'Women Pants' },
                      { value: 'WomenT_shirts', label: 'Women T-Shirts' },
                      { value: 'WomenShirts', label: 'Women Shirts' },
                      { value: 'WomenHoodies', label: 'Women Hoodies' },
                      { value: 'Pants', label: 'Pants' },
                      { value: 'T_shirts', label: 'T_shirts' },
                   
                      { value: 'Shirts', label: 'Shirts' },
                      { value: 'Hoodies', label: 'Hoodies' },
                
                    ]}
                  />
                </Form.Item>
                <Form.Item label="Description" help={errors.description && touched.description && errors.description}>
                  <TextArea
                    rows={4}
                    name="description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                    placeholder="Enter item description"
                  />
                </Form.Item>
                <Form.Item label="Size" help={errors.sizes && touched.sizes && errors.sizes}>
                  <Checkbox.Group
                    options={[
                      { label: 'Small', value: 'Small' },
                      { label: 'Large', value: 'Large' },
                      { label: 'XL', value: 'XL' },
                      { label: 'Medium', value: 'Medium' },
                      { label: 'None', value: 'None' }
                    ]}
                    value={values.sizes}
                    onChange={(checkedValues) => handleSizeChange(checkedValues, setFieldValue)}
                  />
                </Form.Item>
                <Form.Item label="Sold Products" help={errors.soldProducts && touched.soldProducts && errors.soldProducts}>
                  <Input
                    type="number"
                    name="soldProducts"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.soldProducts}
                    placeholder="Enter number of sold products"
                  />
                </Form.Item>
                <Form.Item label="Upload" help={errors.upload && touched.upload && errors.upload}>
                  <Upload
                    listType="picture-card"
                    onChange={(info) => setFieldValue('upload', info.fileList)}
                  >
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  </Upload>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" disabled={isSubmitting}>
                    Submit
                  </Button>
                </Form.Item>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  </div>
);

export default AddItems;
