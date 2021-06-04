import React, { useEffect, useState } from 'react'
import { MailIcon, ShieldCheckIcon } from '@heroicons/react/outline';
import axios from 'axios';
import { object, string } from 'zod';
import { Form, useZodForm } from '~/components/ui/Form/Form';
import { SuccessMessage } from '~/components/ui/Form/SuccessMessage';
import { Input } from '~/components/ui/Form/Input';
import { TextArea } from '~/components/ui/Form/Textarea';
import { CheckCircleIcon } from '@heroicons/react/solid';

const contactSchema = object({
	email: string().email(),
	name: string().min(1, { message: "Should be at least 1 character" }),
	message: string().min(1, { message: "Should be at least 1 character" }),
  plan: string().nullable()
});

interface Props {
  userPlan?: string
}

function ContactForm({ userPlan }: Props) {	

  const [submitSuccess, setSubmitSuccess] = useState(false);

  const form = useZodForm({
		schema: contactSchema,
	});

  

  /*
    If the userPlan is given as Props, this automatically sets in the form obj
  */
  useEffect(() => {
    form.setValue("plan", userPlan || null)
  }, [userPlan])

  return (
    <div className="relative flex flex-col z-0 items-center w-full max-w-screen-xl mx-auto mb-44">
      {/* <img
        src="/assets/vaker-icon-only.jpg"
        alt="Vaker Logo"
        className="absolute z-20 bottom-2/4 w-60 md:-bottom-14 lg:-bottom-12 xl:-bottom-52 opacity-5 md:w-96 xl:w-[540px]"
      /> */}
      <div className="lg:grid lg:grid-cols-9 gap-6 w-full px-2 py-8 sm:p-8 mt-12 space-y-4 rounded-xl shadow-md bg-[#F5FAFE]">
        {/** Contact Texts - Left Row */}
        <div className="px-2 sm:p-0 md:col-span-4 xl:col-span-3 z-20 flex flex-col w-full space-y-4">
          <h6 className="text-xl font-bold sm:text-2xl">
            Get in touch with us
          </h6>
          <p className="text-sm leading-4 text-font-2 max-w-md">
            Let us know how we can help. 
            Fill out that form and our team will get back to you as soon as possible.  
            Normally in under 24h.
          </p>
          <div className="flex flex-row items-center pt-4 space-x-2 sm:pt-12">
            <MailIcon className="w-6 h-6" />
            <a href="mailto:video@vaker.ai" className="text-lg font-normal">
              {userPlan ? "member@vaker.ai" : "video@vaker.ai"}
            </a>
          </div>
        </div>
        {/** Contact Forms - Right Row */}
        <div className="p-8 md:col-span-5 xl:col-span-6 z-50 flex flex-col items-center w-full space-y-4 bg-white rounded-xl shadow-md ">
          {submitSuccess && (
            <SuccessMessage>
              Your contact was submitted successfully
            </SuccessMessage>
          )}
          <Form
            form={form}
            onSubmit={async ({ email, name, message, plan }) => {
              await axios
                .post('http://localhost:3001/contact/request', {
                  email: email,
                  name: name,
                  message: message,
                  plan: plan
                })
                .catch((err) => console.log(err));
              setSubmitSuccess(true);
            }}
            className="w-full"
          >
            { userPlan  && (
              <div className="w-full pb-2">
                <div className="text-font-1 flex items-center space-x-1">
                  <CheckCircleIcon className="w-6 h-6 text-green-400" /> 
                  <div className="pb-0.5">
                    <span className="text-font-2 text-sm">Your plan:</span>
                    <span className="text-font-1 ml-1">{ userPlan }</span>
                  </div>
                </div>
              </div>
            )}
            
            <Input
              placeholder="Your name"
              type="text"
              autoComplete="name"
              autoFocus
              {...form.register('name')}
            />
            <Input
              placeholder="Your email adress"
              type="email"
              autoComplete="email"
              {...form.register('email')}
            />
            
            <TextArea
              placeholder="How can we help you?"
              className="resize-none"
              {...form.register('message')}
            />
            <button
              type="submit"
              className="w-full px-4 py-3 text-lg font-bold uppercase text-white bg-[#425B7D] rounded-lg hover:opacity-80"
            >
              Send Message
            </button>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default ContactForm
