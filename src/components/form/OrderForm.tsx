import React from "react";
import Navbar from "../layout/Navbar";
import { Field } from "./Field";
import axios from "axios";
import { useRouter } from "next/router";
import type { IProduct, ICategory, IOrder } from "../../types";

import type { Prisma } from "@prisma/client";
import toast from "react-hot-toast";
import { useForm, Controller, NestedValue } from "react-hook-form";

import ReactSelect from "react-select";

import { InputStyle, InputStyleReadOnly, LabelStyle } from "./FormStyle";
import moment from "moment";

interface IProductOption {
  value: string;
  label: string;
}

export type FormValues = {
  id: string;
  date: string;
  notes: string;
  addon: string;
  products: IProductOption[];
};

type Props = {
  order?: IOrder;
  products: IProduct[];
  //   categories: ICategory[];
  //   codes: string[];
  operation: "create" | "update";
};

const OrderForm = ({ order, products, operation }: Props) => {
  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    // defaultValues,
  });

  const productsOptions: IProductOption[] = products?.map((product) => {
    return {
      value: product.id,
      label: product.name,
    };
  });

  //   const {
  //     register,
  //     handleSubmit,
  //     formState: { errors },
  //   } = useForm<OrderFormData>();

  const onSubmit = (data: FormValues) => {
    console.log("data", data);
  };
  console.log("order.date", order.date);

  return (
    <div className="h-[100vh] dark:bg-gray-900">
      <Navbar />
      <div className="mx-auto my-6 max-w-5xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6 grid  gap-6 md:grid-cols-2">
            {/* ID field */}
            <div>
              <label htmlFor={"id"} className={LabelStyle}>
                ID *
              </label>
              <input
                {...register("id", { required: true })}
                className={InputStyleReadOnly}
                defaultValue={order?.id}
                placeholder="Id will be generated automatically"
                readOnly
              />
            </div>
            {/* Date field */}
            <div>
              <label htmlFor={"date"} className={LabelStyle}>
                Date *
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    aria-hidden="true"
                    className="h-5 w-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  {...register("date", { required: true })}
                  type="date"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="Select date"
                  defaultValue={moment(order?.date).format("YYYY-MM-DD")}
                />
              </div>
              {errors.date && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>
            {/* Notes field */}
            <div>
              <label htmlFor={"notes"} className={LabelStyle}>
                Notes (optional)
              </label>
              <input
                {...register("notes", { required: false })}
                className={InputStyle}
                defaultValue={order?.notes?.toString()}
              />
            </div>
            <div>
              <label htmlFor={"addon"} className={LabelStyle}>
                Add-On (optional)
              </label>
              <input
                {...register("addon", { required: false })}
                className={InputStyle}
                defaultValue={order?.addon?.toString()}
              />
            </div>
            {/* Products field */}
            <div>
              <label htmlFor={"products"} className={LabelStyle}>
                Products
              </label>
              <Controller
                render={({ field }) => (
                  <ReactSelect
                    id="selectbox"
                    instanceId="selectbox"
                    {...field}
                    options={productsOptions}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    isMulti
                  />
                )}
                name="products"
                control={control}
              />
            </div>

            {/* <div>
              <label
                htmlFor="categoryId"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Category
              </label>
              <Select
                {...register(`products`, { required: true })}
                defaultValue={[colourOptions[2], colourOptions[3]]}
                isMulti
                name="colors"
                options={colourOptions}
                className="basic-multi-select"
                classNamePrefix="select"
              />
            </div> */}
            {/* <div>
              <Field
                label="code"
                register={register}
                required={true}
                defaultValue={product?.code}
                placeholder="Create a unique code for your product"
                handleChange={handleChange}
              />
              {errors.code && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
              {!isUnique && (
                <span className="text-sm text-red-500">
                  This code is already in use
                </span>
              )}
            </div>
            <div>
              <Field
                label="name"
                register={register}
                required={true}
                defaultValue={product?.name}
              />
              {errors.name && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>
            <div>
              <Field
                label="size"
                register={register}
                required={true}
                defaultValue={product?.size}
              />
              {errors.size && (
                <span
                  className="
                text-sm text-red-500
              "
                >
                  This field is required
                </span>
              )}
            </div>
            <div>
              <Field
                label=""
                register={register}
                type="number"
                required={true}
                defaultValue={product?.price}
              />
              {errors.price && (
                <span
                  className="
                text-sm text-red-500
              "
                >
                  This field is required
                </span>
              )}
            </div>
            <div>
              <Field
                label="description"
                register={register}
                required={false}
                defaultValue={product?.description?.toString()}
              />
            </div>
            <div>
              <Field
                label="image"
                register={register}
                required={false}
                defaultValue={product?.image?.toString()}
              />
            </div>
            <div>
              <label
                htmlFor="categoryId"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Category
              </label>
              <select
                {...register("categoryId")}
                className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 `}
                defaultValue={product?.categoryId?.toString()}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div> */}
          </div>
          {/* {operation === "create" ? (
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
              disabled={!isUnique}
            >
              Create
            </button>
          ) : (
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
              disabled={!isUnique}
            >
              Update
            </button>
          )} */}
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
          >
            {operation === "create" ? "Create" : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;
