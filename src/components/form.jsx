import { useForm } from "react-hook-form";
import { formSchema } from "../schema/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Form() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm(
        {
            resolver: zodResolver(formSchema),
            defaultValues: {
                firstName: "",
                lastName: "",
                password: "",    
                city: "",
                state: "",
                zip: "",
            },
        },
    );
    
    const onSubmit = () => {
        // Handle form submission
        console.log("Form submitted successfully");
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white shadow-md rounded-lg p-8 w-full max-w-2xl"
            >
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                    Registration Form
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* First Name */}
                    <div>
                        <label htmlFor="grid-first-name" className="block text-sm font-medium text-gray-700 mb-1">
                            First Name
                        </label>
                        <input
                            id="grid-first-name"
                            type="text"
                            placeholder="Jane"
                            className={`w-full px-4 py-2 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'
                                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400`}
                            {...register("firstName")}
                        />
                        {errors.firstName && (
                            <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                        )}
                    </div>

                    {/* Last Name */}
                    <div>
                        <label htmlFor="grid-last-name" className="block text-sm font-medium text-gray-700 mb-1">
                            Last Name
                        </label>
                        <input
                            id="grid-last-name"
                            type="text"
                            placeholder="Doe"
                            className={`w-full px-4 py-2 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'
                                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400`}
                            {...register("lastName")}
                        />
                        {errors.lastName && (
                            <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                        )}
                    </div>
                </div>

                {/* Password */}
                <div className="mb-6">
                    <label htmlFor="grid-password" className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                    </label>
                    <input
                        id="grid-password"
                        type="password"
                        placeholder="********"
                        className={`w-full px-4 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'
                            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400`}
                        {...register("password")}
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                    )}
                </div>

                {/* City, State, Zip */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    {/* City */}
                    <div>
                        <label htmlFor="grid-city" className="block text-sm font-medium text-gray-700 mb-1">
                            City
                        </label>
                        <input
                            id="grid-city"
                            type="text"
                            placeholder="Albuquerque"
                            className={`w-full px-4 py-2 border ${errors.city ? 'border-red-500' : 'border-gray-300'
                                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400`}
                            {...register("city")}
                        />
                        {errors.city && (
                            <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
                        )}
                    </div>

                    {/* State */}
                    <div>
                        <label htmlFor="grid-state" className="block text-sm font-medium text-gray-700 mb-1">
                            State
                        </label>
                        <select
                            id="grid-state"
                            className={`w-full px-4 py-2 border ${errors.state ? 'border-red-500' : 'border-gray-300'
                                } rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-400`}
                            {...register("state")}
                        >
                            <option value="">Select State</option>
                            <option>New Mexico</option>
                            <option>Missouri</option>
                            <option>Texas</option>
                        </select>
                        {errors.state && (
                            <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>
                        )}
                    </div>

                    {/* Zip */}
                    <div>
                        <label htmlFor="grid-zip" className="block text-sm font-medium text-gray-700 mb-1">
                            Zip Code
                        </label>
                        <input
                            id="grid-zip"
                            type="text"
                            placeholder="90210"
                            className={`w-full px-4 py-2 border ${errors.zip ? 'border-red-500' : 'border-gray-300'
                                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400`}
                            {...register("zip")}
                        />
                        {errors.zip && (
                            <p className="text-red-500 text-sm mt-1">{errors.zip.message}</p>
                        )}
                    </div>
                </div>

                {/* Submit Button */}
                <div className="text-center">
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md shadow-md transition-all duration-200"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}
