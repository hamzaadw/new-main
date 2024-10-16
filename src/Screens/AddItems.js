import { Formik } from 'formik';
import { Input, Select, Form, Button, Upload, Checkbox } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { collection, addDoc, doc, updateDoc, Timestamp } from "firebase/firestore"; 
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from '../configirations/firebase'; // Ensure the correct path to your Firestore config

// Function to handle the selection of product size
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
    
    // Upload each file to Firebase Storage
    const uploadPromises = values.upload.map(file => {
      const storageRef = ref(storage, `products/${file.originFileObj.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file.originFileObj);

      return new Promise((resolve, reject) => {
        uploadTask.on('state_changed', 
          (snapshot) => {
            // Optional: You can use the snapshot to track upload progress
          }, 
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

    // Wait for all uploads to complete
    const uploadURLs = await Promise.all(uploadPromises);

    console.log('File upload successful, URLs:', uploadURLs);

    // Add document to Firestore
    const docRef = await addDoc(collection(db, "Product"), {
      name: values.name,
      price: values.price,
      rating: values.rating,
      category: values.category,
      description: values.description,
      image: uploadURLs, // Save the array of download URLs
      sizes: values.sizes, // Save the selected sizes array
      productDate: Timestamp.now()
    });

    console.log("Document added with ID: ", docRef.id);

    // Update the document with its own ID
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
            initialValues={{ category: '', name: '', price: '', rating: '', description: '', upload: [], sizes: [] }}
            validate={values => {
              const errors = {};
              if (!values.name) {
                errors.name = 'Required';
              }
              if (!values.price) {
                errors.price = 'Required';
              }
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
                <Form.Item label="Item Name">
                  <Input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    placeholder="Enter item name"
                  />
                  {errors.name && touched.name && <div>{errors.name}</div>}
                </Form.Item>
                <Form.Item label="Price">
                  <Input
                    type="number"
                    name="price"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.price}
                    placeholder="Enter item price"
                  />
                  {errors.price && touched.price && <div>{errors.price}</div>}
                </Form.Item>
                <Form.Item label="Rating">
                  <Input
                    type="number"
                    name="rating"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.rating}
                    placeholder="Enter rating"
                  />
                  {errors.rating && touched.rating && <div>{errors.rating}</div>}
                </Form.Item>
                <Form.Item label="Category">
                  <Select
                    onBlur={handleBlur}
                    value={values.category}
                    name="category"
                    style={{ width: 120 }}
                    onChange={(value) => handleChanger(value, setFieldValue)}
                    options={[
                      { value: 'Pants', label: 'Pants' },
                      { value: 'T_shirts', label: 'T_shirts' },
                      { value: 'Unstitched', label: 'Unstitched' },
                      { value: 'Shirts', label: 'Shirts' },
                      { value: 'Hoodies', label: 'Hoodies' },
                      { value: 'Stitched', label: 'Stitched' },
                    ]}
                  />
                  {errors.category && touched.category && <div>{errors.category}</div>}
                </Form.Item>
                <Form.Item label="Description">
                  <TextArea
                    rows={4}
                    name="description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                    placeholder="Enter item description"
                  />
                </Form.Item>

                {/* Checkbox section for Sizes */}
                <Form.Item label="Size">
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

                <Form.Item
                  label="Upload"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                >
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
