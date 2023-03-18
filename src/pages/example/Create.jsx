import { Create } from "@pankod/refine-mui";
import { useForm } from "@pankod/refine-react-hook-form";

import Fields from "./Fields";

export default function CompCreate() {
  const {
    refineCore: { formLoading },
    saveButtonProps,
    register,
    control,
    formState: { errors },
    getValues,
  } = useForm();

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Fields
        register={register}
        control={control}
        errors={errors}
        getValues={getValues}
      />
    </Create>
  );
}
