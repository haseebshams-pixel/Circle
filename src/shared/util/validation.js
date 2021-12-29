import * as yup from "yup";

const RegistrationVS = yup.object().shape({
  isPublisher: yup.boolean(),
  email: yup
    .string()
    .required("Email Required")
    .email("Invalid Email")
    .label("email"),
  username: yup
    .string()
    .required("Username Required")
    .min(4, "Username Too Short")
    .label("username"),
  firstname: yup.string().required("Firstname Required").label("firstname"),
  lastname: yup.string().required("Lastname Required").label("lastname"),
  phonenumber: yup.string().when("isPublisher", {
    is: true,
    then: yup.string().required("Phone Number Required").label("phonenumber"),
  }),
  officeAddress: yup.string().when("isPublisher", {
    is: true,
    then: yup.string().required("Address Required").label("officeAddress"),
  }),
  role: yup.string().required("Role is Required").label("role"),
});

const EditProfileVS = yup.object().shape({
  bio: yup.string().required("Bio is Required").label("bio"),
});
const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "video/mp4",
  "audio/mp3",
  "video/mov",
  "video/wmv",
  "video/avi",
  "audio/mpeg",
];
const CreateCollectionSchema = yup.object().shape({
  profileImage: yup
    .mixed()
    .required("Profile Image is required")
    .test("fileFormat", "Please Add Only Image", function (value) {
      return SUPPORTED_FORMATS.includes(value?.type);
    })
    // .test("fileSize", "File Size is too large", (value) => {
    //   const sizeInBytes = 500000; //0.5MB
    //   return value?.size <= sizeInBytes;
    // })
    .label("profileImage"),
  coverImage: yup
    .mixed()
    .required("Banner Image is required")
    .test("fileFormat", " [Incorrect file tye]", function (value) {
      return SUPPORTED_FORMATS.includes(value?.type);
    })
    // .test("fileSize", "File Size is too large", (value) => {
    //   const sizeInBytes = 500000; //0.5MB
    //   return value?.size <= sizeInBytes;
    // })
    .label("coverImage"),
  name: yup
    .string()
    .required("Collection Name is Required")
    .min(4, "Collection Name Too Short")
    .label("name"),
  symbol: yup
    .string()
    .required("Collection Symbol is Required")
    .min(2, "Collection Symbol Too Short")
    .label("symbol"),
  description: yup
    .string()
    .required("Collection Description is Required")
    .min(4, "Collection Description Too Short")
    .label("description"),
});
const imageWidthAndHeight = (provideFile) => {
  // take the given file (which should be an image) and return the width and height
  const imgDimensions = { width: null, height: null };

  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.readAsDataURL(provideFile);
    reader.onload = function () {
      const img = new Image();
      img.src = reader.result;

      img.onload = function () {
        imgDimensions.width = img.width;
        imgDimensions.height = img.height;

        resolve(imgDimensions);
      };
    };
  });
};
const imageDimensionCheck = yup.addMethod(
  yup.mixed,
  "imageDimensionCheck",
  function (message, requiredWidth, requiredHeight) {
    return this.test(
      "image-width-height-check",
      message,
      async function (value) {
        const { path, createError } = this;
        var Type = value?.type.substr(0, 5);
        if (!value) {
          return;
        }
        if (Type == "image") {
          const imgDimensions = await imageWidthAndHeight(value);

          if (imgDimensions.width !== imgDimensions.height) {
            return createError({
              path,
              message: `Image width and height needs to be the same`,
            });
          }
          if (imgDimensions.width <= requiredWidth) {
            return createError({
              path,
              message: `Image width and height must be the greater than ${requiredWidth}px`,
            });
          }
          return true;
        } else {
          return true;
        }

        // if (imgDimensions.height !== requiredHeight) {
        //   return createError({
        //     path,
        //     message: `The file height needs to be the ${requiredHeight}px!`,
        //   });
        // }
      }
    );
  }
);
export { RegistrationVS, EditProfileVS, CreateCollectionSchema };
