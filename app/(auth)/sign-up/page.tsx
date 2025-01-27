import React from 'react'
import AuthForm from '@/components/AuthForm'
// import { getLoggedInUser } from '@/lib/actions/user.actions';

const SignUp = async () => {
    // //in thử ra để test xem có lấy được user khôngkhông
    // const loggedInUser = await getLoggedInUser();
    // console.log(loggedInUser);

    return (
        <section className="flex-center size-full max-sm:px-6">
            <AuthForm
                type="sign-up"
            />
        </section>
    )
}

export default SignUp