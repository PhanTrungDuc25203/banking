'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomInput from './CustomInput'
import { authFormSchema } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

const AuthForm = ({ type }: { type: string }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const formSchema = authFormSchema(type);

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        setIsLoading(true)
        console.log(values)
        setIsLoading(false)
    }

    return (
        <section className="auth-form">
            <header className="flex flex-col gap-5 md:gap-8">
                <Link href="/" className="cursor-pointer flex items-center gap-1">
                    <Image
                        src="/icons/logo.svg"
                        width={34}
                        height={34}
                        alt="Horizon logo"
                    />
                    <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">Horizon</h1>
                </Link>
                <div className="flex flex-col gap-1 md:gap-3">
                    <h1 className="text-24 font-semibold lg:text-36 text-gray-900">
                        {user ? 'Link account' : type === 'sign-in' ? 'Sign In' : 'Sign Up'}
                        <p className="text-16 font-normal text-gray-600">
                            {user ? 'Link your accountto get started' : 'Please enter your details'}
                        </p>
                    </h1>
                </div>
            </header>
            {user ? (
                <div className="flex flex-col gap-4">

                </div>
            ) :
                (
                    <React.Fragment>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                {type === "sign-up" && (
                                    <React.Fragment>
                                        <div className="flex gap-4">
                                            <CustomInput
                                                control={form.control}
                                                name='firstName'
                                                label="First name"
                                                placeholder="Phan"
                                            />
                                            <CustomInput
                                                control={form.control}
                                                name='lastName'
                                                label="Last name"
                                                placeholder="Piscean"
                                            />
                                        </div>
                                        <CustomInput
                                            control={form.control}
                                            name='address1'
                                            label="Address"
                                            placeholder="Hoang Cuong Thanh Ba tinh Phu Tho"
                                        />
                                        <div className="flex gap-4">
                                            <CustomInput
                                                control={form.control}
                                                name='state'
                                                label="Province"
                                                placeholder="Phu Tho"
                                            />
                                            <CustomInput
                                                control={form.control}
                                                name='postalCode'
                                                label="Postal code"
                                                placeholder="Example: 12345"
                                            />
                                        </div>
                                        <div className="flex gap-5">
                                            <CustomInput
                                                control={form.control}
                                                name='dateOfBirth'
                                                label="Date of Birth"
                                                placeholder="yyyy-mm-dd"
                                            />
                                            <CustomInput
                                                control={form.control}
                                                name='snn'
                                                label="SNN"
                                                placeholder="Example: 1234"
                                            />
                                        </div>
                                    </React.Fragment>
                                )}
                                <CustomInput
                                    control={form.control}
                                    name='email'
                                    label="Email"
                                    placeholder="Enter your username"
                                />
                                <CustomInput
                                    control={form.control}
                                    name='password'
                                    label="Password"
                                    placeholder="Enter your password"
                                />
                                <div className="flex flex-col gap-4">
                                    <Button type="submit" className="form-btn" disabled={isLoading}>
                                        {isLoading ? (
                                            <React.Fragment>
                                                <Loader2
                                                    size={20}
                                                    className="animate-spin"
                                                /> &nbsp;
                                                Loading...
                                            </React.Fragment>
                                        ) :
                                            type === "sign-in" ? "Sign In" : "Sign Up"
                                        }
                                    </Button>
                                </div>
                            </form>
                        </Form>
                        <footer className="flex justify-center gap-1">
                            <p className="text-14 font-normal text-gray-600">
                                {type === "sign-in" ? "Don't have an account?" : "Already have an account"}
                            </p>
                            <Link href={type === "sign-in" ? "/sign-up" : "/sign-in"} className="form-link">
                                {type === "sign-in" ? "Sign up" : "Sign in"}
                            </Link>
                        </footer>
                    </React.Fragment>
                )}
        </section>
    )
}

export default AuthForm