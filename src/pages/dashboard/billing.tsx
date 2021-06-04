import { DownloadIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { useState, ReactNode } from 'react';
import DashboardWrapper from '~/components/ui/DashboardWrapper';
import { Input } from '~/components/ui/Form/Input';
import { object, string } from 'zod';
import { Form, useZodForm } from '~/components/ui/Form/Form';
import { Button } from '~/components/ui/Button';
import { GoogleIcon } from '~/components/icons/GoogleIcon';

//TODO The invoices are hardcoded for now
const invoiceList = [
  "March 2021",
  "February 2021",
  "January 2021",
]

const validationMessage = "Mandatory Information"

const billingSchema = object({
  company: string().nullable(),
  name: string().length(3, { message: validationMessage }),
  lastName: string().length(3, { message: validationMessage }),
  address: string().length(3, { message: validationMessage }),
  city: string().length(3, { message: validationMessage }),
  postCode: string().length(3, { message: validationMessage }),
  country: string().length(3, { message: validationMessage }),
  vat: string().nullable()
});


interface BillingInputWrapperProps {
  children: ReactNode;
  label: string;
  optional?: boolean;
}

const BillingInputWrapper = ({ children, label, optional } : BillingInputWrapperProps ) => (
  <div className="md:grid md:grid-cols-9">
    <div className="md:col-span-3 lg:col-span-3 leading-4">
      <label className="inline text-sm text-font-2 mr-5">{ label }: {optional && "(optional)"}</label>
    </div>
    <div className="md:col-span-6 lg:col-span-6 ">
      { children }
    </div>
  </div>
)

export default function Billing() {
	const router = useRouter();

  const form = useZodForm({
		schema: billingSchema,
	});

	return (
		<DashboardWrapper pageTitle="Billing">
      <div>

        <div className="relative rounded-xl lg:grid lg:grid-cols-6 lg:gap-12 bg-bg-3 shadow-md px-2 py-8 sm:p-8">
          {/* <img
            src="/assets/vaker-icon-only.jpg"
            alt="Vaker Logo"
            className="absolute hidden lg:block z-10 w-60 md:-bottom-14 lg:-bottom-12 xl:-bottom-52 opacity-5 md:w-96 xl:w-[540px]"
          /> */}
          <div className="lg:col-span-4">
            <div className="pt-2 text-font-1 pb-8 px-4 flex items-center justify-center space-x-3">
              <GoogleIcon size={40} /> 
              <div className="text-xl">
                <span className="text-font-2 text-xs lg:text-base">logged in with Google:</span> leonf@gmail.com
              </div>
            </div>
            <div className="rounded-xl shadow-md bg-white p-8 relative z-20">

              <Form form={form} onSubmit={() => {}} >
                <div className="space-y-2">
                  <BillingInputWrapper label="Company Name" optional>
                    <Input type="text" placeholder="The official company name" { ...form.register("company") } />
                  </BillingInputWrapper>
                  <BillingInputWrapper label="First Name">
                    <Input type="text" placeholder="" { ...form.register("name") } />
                  </BillingInputWrapper>
                  <BillingInputWrapper label="Last Name">
                    <Input className="" type="text" placeholder="" { ...form.register("lastName") } />
                  </BillingInputWrapper>
                </div>

                <br/>

                <div className="space-y-2">
                  <BillingInputWrapper label="Address">
                    <Input type="text" placeholder="" { ...form.register("address") } />
                  </BillingInputWrapper>
                  <BillingInputWrapper label="City">
                    <Input type="text" placeholder="" { ...form.register("city") } />
                  </BillingInputWrapper>
                  <BillingInputWrapper label="Post Code">
                    <Input type="text" placeholder="" { ...form.register("postCode") } />
                  </BillingInputWrapper>
                  <BillingInputWrapper label="Country">
                    <Input type="text" placeholder="" { ...form.register("country") } />
                  </BillingInputWrapper>
                </div>

                <br/>

                <div>
                  <BillingInputWrapper label="VAT" optional>
                    <Input type="text" placeholder="Your company VAT number" { ...form.register("vat") } />
                  </BillingInputWrapper>
                </div>

                <div className="w-full">
                  <button
                    type="submit"
                    className="mt-12 w-full block max-w-md px-4 py-3 mx-auto text-lg font-bold uppercase text-white bg-main rounded-lg hover:opacity-80"
                  >
                    Update Data
                  </button>
                </div>

              </Form>
            </div>

            
          </div>

          <div className="rounded-xl lg:col-span-2 bg-white py-4 shadow-md mt-12 lg:mt-0 relative z-20">
            <div className="uppercase font-bold text-lg tracking-wider text-center">invoices</div>
            <div className="my-4 lg:space-y-3 space-y-2 md:space-y-0 md:grid md:grid-cols-2 lg:block px-8 gap-2">
              { invoiceList.map(invoice => (
                <div className="rounded text-center py-2 bg-bg-3" key={invoice}>{ invoice } <DownloadIcon className="h-4 w-4 inline" /></div>
              )) }
            </div>
          </div>  

        </div>

        <div className="bg-bg-3 rounded-xl shadow-md p-8 sm:max-w-xs mt-12 relative">
          <p className="text-font-2 mb-4 text-sm">
            If you want to delete your entire Vaker.ai account and all associated data with it, click here.
          </p>
          <div className="relative z-20">
            <Button variant="danger">
              Delete Account
            </Button>

          </div>
        </div>

      </div>


    </DashboardWrapper>

	);
}

