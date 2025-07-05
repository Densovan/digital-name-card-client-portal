// "use client";
// import React, { useState } from "react";
// import { useFieldArray, useForm } from "react-hook-form";
// import z from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Plus, Trash2 } from "lucide-react";
// import { Avatar } from "@radix-ui/react-avatar";
// import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// const formSchema = z.object({
//   gender: z.enum(["male", "female"]),
//   nationality: z.string().min(1),
//   dob: z.string().refine((val) => !isNaN(Date.parse(val)), {
//     message: "Invalid date format",
//   }),
//   address: z.string().min(1),
//   phone: z.string().min(1),
//   card_type: z.enum(["Modern", "Minimal", "Corporate"]),
//   social: z.array(
//     z.object({
//       id: z.string().optional(), // Optional since it's not always there
//       platform: z.string().min(1),
//       icon: z.string().url(),
//       url: z.string().url(),
//     })
//   ),
// });

// type ProfileFormType = z.infer<typeof formSchema>;
// const Profile = () => {
//   const [avatarFile, setAvatarFile] = useState<File | null>(null);
//   const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
//   const [socialIcons, setSocialIcons] = useState<Record<number, File | null>>(
//     {}
//   );
//   const [iconPreviews, setIconPreviews] = useState<Record<number, string>>({});

//   const DEFAULT_ICON =
//     "https://cdns-icons-png.flaticon.com/512/15047/15047435.png";

//   const form = useForm<ProfileFormType>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       gender: "male",
//       nationality: "CAMBODIAN",
//       dob: "",
//       address: "",
//       phone: "",
//       card_type: "Minimal",
//       social: [{ platform: "", icon: "", url: "" }],
//     },
//   });

//   const { control, handleSubmit } = form;
//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "social",
//   });

//   const onSubmit = (values: ProfileFormType) => {
//     console.log("Form data:", values);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br  p-4">
//       <div className="max-w-sm mx-auto space-y-4">
//         <Form {...form}>
//           <form
//             onSubmit={handleSubmit(onSubmit)}
//             className="space-y-6 max-w-2xl mx-auto"
//           >
//             <div className="flex flex-col items-center space-y-2">
//               <label
//                 htmlFor="avatarUpload"
//                 className="cursor-pointer relative group"
//               >
//                 <div className="w-24 h-24 rounded-full border overflow-hidden bg-gray-100">
//                   {avatarPreview ? (
//                     <img
//                       src={avatarPreview}
//                       alt="Avatar"
//                       className="w-full h-full object-cover"
//                     />
//                   ) : (
//                     <div className="w-full h-full flex items-center justify-center text-gray-400">
//                       + Avatar
//                     </div>
//                   )}
//                 </div>

//                 {avatarPreview && (
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setAvatarFile(null);
//                       setAvatarPreview(null);
//                     }}
//                     className="absolute -top-2 -right-2 bg-white text-red-500 rounded-full w-5 h-5 flex items-center justify-center text-xs shadow"
//                   >
//                     ✕
//                   </button>
//                 )}
//               </label>

//               <input
//                 id="avatarUpload"
//                 type="file"
//                 accept="image/*"
//                 className="hidden"
//                 onChange={(e) => {
//                   const file = e.target.files?.[0];
//                   if (file && file.size < 2 * 1024 * 1024) {
//                     setAvatarFile(file);
//                     setAvatarPreview(URL.createObjectURL(file));
//                   } else {
//                     alert("Avatar must be under 2MB");
//                   }
//                 }}
//               />
//             </div>
//             <FormField
//               control={form.control}
//               name="gender"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Gender</FormLabel>
//                   <Select
//                     onValueChange={field.onChange}
//                     defaultValue={field.value}
//                   >
//                     <FormControl>
//                       <SelectTrigger className="w-full">
//                         <SelectValue placeholder="Select Gender" />
//                       </SelectTrigger>
//                     </FormControl>
//                     <SelectContent>
//                       <SelectItem value="male">Male</SelectItem>
//                       <SelectItem value="female">Female</SelectItem>
//                     </SelectContent>
//                   </Select>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="nationality"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Nationality</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Nationality" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="dob"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Date of Birth</FormLabel>
//                   <FormControl>
//                     <Input type="date" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="address"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Address</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Address" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="phone"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Phone</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Phone Number" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="card_type"
//               render={({ field }) => (
//                 <FormItem className="w-full">
//                   <FormLabel>Card Type</FormLabel>
//                   <Select
//                     onValueChange={field.onChange}
//                     defaultValue={field.value}
//                   >
//                     <FormControl>
//                       <SelectTrigger className="w-full">
//                         <SelectValue placeholder="Select Card Type" />
//                       </SelectTrigger>
//                     </FormControl>
//                     <SelectContent>
//                       <SelectItem value="Modern">Modern</SelectItem>
//                       <SelectItem value="Minimal">Minimal</SelectItem>
//                       <SelectItem value="Corporate">Corporate</SelectItem>
//                     </SelectContent>
//                   </Select>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <div className="space-y-4">
//               <h3 className="text-lg font-semibold">Social Media Links</h3>
//               {fields.map((fieldItem, index) => (
//                 <div
//                   key={fieldItem.id}
//                   className="border p-4 rounded-md space-y-3 relative"
//                 >
//                   <Button
//                     type="button"
//                     variant="ghost"
//                     size="icon"
//                     className="absolute top-2 right-2"
//                     onClick={() => remove(index)}
//                   >
//                     <Trash2 className="w-4 h-4 text-red-500" />
//                   </Button>

//                   <FormField
//                     control={form.control}
//                     name={`social.${index}.platform`}
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Platform</FormLabel>
//                         <FormControl>
//                           <Input
//                             placeholder="facebook, instagram..."
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <FormField
//                     control={form.control}
//                     name={`social.${index}.icon`}
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Icon URL</FormLabel>
//                         <FormControl>
//                           <Input placeholder="https://..." {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <FormField
//                     control={form.control}
//                     name={`social.${index}.url`}
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Profile URL</FormLabel>
//                         <FormControl>
//                           <Input
//                             placeholder="https://facebook.com/..."
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>
//               ))}
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={() => append({ platform: "", icon: "", url: "" })}
//               >
//                 <Plus className="w-4 h-4 mr-2" /> Add Social Link
//               </Button>
//             </div>

//             <Button type="submit" className="w-full">
//               Submit
//             </Button>
//           </form>
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default Profile;
"use client";
import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Trash2, Plus } from "lucide-react";
import { useQueries, useQuery } from "@tanstack/react-query";
import { cardRequest } from "@/lib/api/card-api";
const formSchema = z.object({
  gender: z.enum(["male", "female"], { required_error: "Gender is required" }),
  nationality: z.string().min(1),
  dob: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  address: z.string().min(1),
  phone: z.string().min(1),
  card_type: z.enum(["Modern", "Minimal", "Corporate"], {
    required_error: "Card type is required",
  }),
  social: z.array(
    z.object({
      id: z.string().optional(),
      platform: z.string().min(1),
      icon: z.string().optional(),
      url: z.string().url(),
    })
  ),
});

type ProfileFormType = z.infer<typeof formSchema>;

const DEFAULT_ICON =
  "https://cdns-icons-png.flaticon.com/512/15047/15047435.png";
const id = "a4413128-0ca2-49b0-9dda-d5e39ac91ece";

export default function ProfileForm() {
  const { GET_CARD } = cardRequest();
  const {
    data: profileData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["card"],
    queryFn: async () => GET_CARD(id),
    enabled: !!id,
  });
  console.log(profileData, "data card");

  const form = useForm<ProfileFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: (profileData ?? {
      gender: "male",
      nationality: "CAMBODIAN",
      dob: "",
      address: "",
      phone: "",
      card_type: "Minimal",
      social: [{ platform: "", icon: "", url: "" }],
    }) as ProfileFormType,
  });

  const { control, handleSubmit } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "social",
  });

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [socialIcons, setSocialIcons] = useState<Record<number, File | null>>(
    {}
  );
  const [iconPreviews, setIconPreviews] = useState<Record<number, string>>({});

  const isValidImage = (file: File) => {
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    const maxSize = 2 * 1024 * 1024;
    return allowedTypes.includes(file.type) && file.size <= maxSize;
  };

  const onSubmit = async (values: ProfileFormType) => {
    let avatarUrl = avatarPreview;

    // Upload new avatar only if new file is selected
    if (avatarFile) {
      const formData = new FormData();
      formData.append("image", avatarFile);
      const res = await fetch(
        "http://localhost:8000/api/v1/upload/upload-image",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      avatarUrl = data.url;
    }

    // Upload new icons only if new files selected
    const updatedSocial = await Promise.all(
      values.social.map(async (item, index) => {
        const file = socialIcons[index];
        if (file) {
          const formData = new FormData();
          formData.append("image", file);
          const res = await fetch(
            "http://localhost:8000/api/v1/upload/upload-image",
            {
              method: "POST",
              body: formData,
            }
          );
          const data = await res.json();
          return { ...item, icon: data.url };
        }

        // 🧠 Keep existing icon preview if no new file
        return {
          ...item,
          icon: iconPreviews[index] || "",
        };
      })
    );

    const finalPayload = {
      ...values,
      avatar: avatarUrl,
      social: updatedSocial,
    };

    console.log("Final Payload:", finalPayload);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 max-w-2xl mx-auto"
      >
        {/* Avatar Upload */}
        <div className="flex flex-col items-center space-y-2">
          <label
            htmlFor="avatarUpload"
            className="cursor-pointer relative group"
          >
            <div className="w-24 h-24 rounded-full border overflow-hidden bg-gray-100">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  + Avatar
                </div>
              )}
            </div>
            {avatarPreview && (
              <button
                type="button"
                onClick={() => {
                  setAvatarFile(null);
                  setAvatarPreview(null);
                }}
                className="absolute -top-2 -right-2 bg-white text-red-500 rounded-full w-5 h-5 flex items-center justify-center text-xs shadow"
              >
                ✕
              </button>
            )}
          </label>
          <input
            id="avatarUpload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file && isValidImage(file)) {
                setAvatarFile(file);
                setAvatarPreview(URL.createObjectURL(file));
              } else {
                alert("Avatar must be an image under 2MB");
              }
            }}
          />
        </div>

        {/* Form Inputs */}
        <FormField
          control={control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="nationality"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nationality</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Nationality" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="dob"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of Birth</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Address" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Phone" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="card_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Card Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Card Type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Modern">Modern</SelectItem>
                  <SelectItem value="Minimal">Minimal</SelectItem>
                  <SelectItem value="Corporate">Corporate</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Dynamic Social Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Social Media Links</h3>
          {fields.map((fieldItem, index) => (
            <div
              key={fieldItem.id}
              className="border p-4 rounded-md space-y-3 relative"
            >
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2"
                onClick={() => remove(index)}
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>

              {/* Icon Upload */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Icon</label>
                <div className="flex items-center space-x-4">
                  <label
                    htmlFor={`icon-upload-${index}`}
                    className="cursor-pointer relative group"
                  >
                    <div className="w-12 h-12 rounded-md border bg-gray-100 overflow-hidden flex items-center justify-center">
                      {iconPreviews[index] ? (
                        <img
                          src={iconPreviews[index]}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <img
                          src={DEFAULT_ICON}
                          className="w-full h-full object-contain opacity-50"
                        />
                      )}
                    </div>
                    {iconPreviews[index] && (
                      <button
                        type="button"
                        onClick={() => {
                          setSocialIcons((prev) => ({
                            ...prev,
                            [index]: null,
                          }));
                          setIconPreviews((prev) => {
                            const updated = { ...prev };
                            delete updated[index];
                            return updated;
                          });
                        }}
                        className="absolute -top-1 -right-1 bg-white text-red-500 rounded-full w-5 h-5 flex items-center justify-center text-xs shadow"
                      >
                        ✕
                      </button>
                    )}
                  </label>

                  <input
                    id={`icon-upload-${index}`}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file && isValidImage(file)) {
                        setSocialIcons((prev) => ({ ...prev, [index]: file }));
                        setIconPreviews((prev) => ({
                          ...prev,
                          [index]: URL.createObjectURL(file),
                        }));
                      } else {
                        alert("Icon must be an image under 2MB");
                      }
                    }}
                  />
                </div>
              </div>

              {/* Platform */}
              <FormField
                control={control}
                name={`social.${index}.platform` as const}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Platform</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="facebook, instagram..." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* URL */}
              <FormField
                control={control}
                name={`social.${index}.url` as const}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profile URL</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="https://..." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() => append({ platform: "", icon: "", url: "" })}
          >
            <Plus className="w-4 h-4 mr-2" /> Add Social Link
          </Button>
        </div>

        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
}
