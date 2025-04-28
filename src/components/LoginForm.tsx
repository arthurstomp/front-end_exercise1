import { FormikProvider, useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

const PLANETS = [
  "Mercury",
  "Venus",
  "Earth",
  "Mars",
  "Jupiter",
  "Saturn",
  "Uranus",
  "Neptune",
];

const MOCK_API_BASE_URL = "http://localhost:3000/";

type FormValues = {
  login: string;
  password: string;
  selectedPlanet: string;
};

const validationSchema = Yup.object({
  login: Yup.string().email(),
  password: Yup.string().url().nullable(),
  selectedPlanet: Yup.string().url().nullable(),
});

export function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const initialValues: FormValues = {
    login: "",
    password: "",
    selectedPlanet: "Earth",
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema,
  });

  return (
    <FormikProvider value={formik}>
      <div className="flex flex-col items-center w-full gap-2">
        <input
          value={formik.values.login}
          onChange={(e) => formik.setFieldValue("login", e.target.value)}
          className="px-10 py-5 bg-black text-white rounded border border-black"
        />

        <input
          value={formik.values.password}
          onChange={(e) => formik.setFieldValue("password", e.target.value)}
          className="px-10 py-5 bg-black text-white rounded border border-black"
        />

        <select
          name="planet"
          onChange={(e) =>
            formik.setFieldValue("selectedPlanet", e.target.value)
          }
        >
          {PLANETS.map((planet) => (
            <option value={planet} key={planet}>
              {planet}
            </option>
          ))}
        </select>

        <button>Submit</button>
      </div>
    </FormikProvider>
  );

  /**
   * Submits the form and makes the API call
   */
  async function handleSubmit(formikValues: FormValues) {
    try {
      setLoading(true);

      const { login, password, selectedPlanet } = formikValues;

      const body = {
        login,
        password,
        selectedPlanet,
      };
      const endpoint = `${MOCK_API_BASE_URL}/login`;

      const response = await fetch(endpoint, {
        body: JSON.stringify(body),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response.status >= 200 && response.status <= 299) {
        const responseContent = response.json();

        // show data to user
      }
    } catch (e) {
      // handle error
    }
  }
}
