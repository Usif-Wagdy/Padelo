import { Formik, Form } from "formik";

export default function BaseForm({
  initialValues,
  validationSchema,
  onSubmit,
  children,
}) {
  return (
    <div className="flex items-center justify-center px-4 py-3 w-full">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="space-y-4 max-w-md w-full">{children}</Form>
      </Formik>
    </div>
  );
}
