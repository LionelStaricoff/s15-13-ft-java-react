import { ErrorMessage, Field, Form, Formik } from 'formik'
import { Button, Input } from '@material-tailwind/react'
import * as Yup from 'yup'
import { useSuppliersActions } from '../../hooks/useSuppliersActions.js'
import { useCreateSupplierMutation, useUpdateSupplierMutation } from '../../store/apiSlice.js'
import { toast } from 'sonner'

export function SuppliersFormik ({ setOpen, setOpenMenu, action, supplierToEdit }) {
  const [supplierCreate] = useCreateSupplierMutation()
  const [supplierUpdate] = useUpdateSupplierMutation()

  const { useAddSupplier, useUpdateSupplierById } = useSuppliersActions()
  const handleClose = () => {
    setOpen(false)
    setOpenMenu(false)
  }
  const INPUT_BG = '#FFF8F8'

  const supplierSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    companyCode: Yup.string().required('Code is required') // Agregar validación por code -> no pueden haber dos suppliers con el mismo code
  })

  const initialValues = {
    name: supplierToEdit?.name ?? '',
    companyCode: supplierToEdit?.companyCode ?? ''
  }

  const createSupplier = async (values) => {
    try {
      const res = await supplierCreate(values).unwrap()
      useAddSupplier(res)
      toast.success('Supplier created successfully', { duration: 1500 })
      handleClose()
    } catch (error) {
      if (error.data) {
        toast.error(`Error while adding: ${JSON.stringify(error.data.message)}`, { duration: 2000 })
      } else {
        console.error(`Error while adding: ${JSON.stringify(error)}`, { duration: 2000 })
      }
    }
  }

  const editSupplier = async (values) => {
    try {
      const res = await supplierUpdate({ id: supplierToEdit.id, data: values }).unwrap()
      useUpdateSupplierById({ id: supplierToEdit.id, newData: res })
      toast.success('Supplier updated successfully', { duration: 1500 })
      handleClose()
    } catch (error) {
      if (error.data) {
        toast.error(`Error while adding: ${JSON.stringify(error.data.message)}`, { duration: 2000 })
      } else {
        console.error(`Error while adding: ${JSON.stringify(error)}`, { duration: 2000 })
      }
    }
  }

  const handleSubmit = async (values) => {
    if (action === 'create') {
      await createSupplier(values)
    } else if (action === 'edit') {
      await editSupplier(values)
    }
  }

  return (
    <Formik initialValues={initialValues} validationSchema={supplierSchema} onSubmit={handleSubmit}>
      {({ errors, touched }) => (
        <Form className='flex flex-col gap-2'>
          <fieldset className='flex flex-col gap-2'>
            <div className='flex flex-col gap-[2px]'>
              <Field name='name'>
                {({ field }) => (
                  <Input {...field} error={errors.name && touched.name && true} type='text' placeholder='Name' label='Name' size='lg' className='bg-primary' style={{ backgroundColor: INPUT_BG }} />
                )}
              </Field>
              {errors.name && touched.name
                ? (<ErrorMessage className='ml-2 text-red-600 text-xs' name='name' component='div' />)
                : <div className='h-4' />}
            </div>
            <div className='flex flex-col gap-[2px]'>
              <Field name='companyCode'>
                {({ field }) => (
                  <Input {...field} error={errors.companyCode && touched.companyCode && true} type='text' placeholder='Code' label='Code' size='lg' className='bg-primary' style={{ backgroundColor: INPUT_BG }} />
                )}
              </Field>
              {errors.companyCode && touched.companyCode
                ? (<ErrorMessage className='ml-2 text-red-500 text-xs' name='companyCode' component='div' />)
                : <div className='h-4' />}
            </div>
          </fieldset>
          <div className='flex justify-evenly gap-2'>
            <Button onClick={() => handleClose()} color='black'>
              Cancel
            </Button>
            <Button type='submit' className='bg-warning text-gray-900'>
              Save
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )
}
