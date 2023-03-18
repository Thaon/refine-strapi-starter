import { Edit } from "@pankod/refine-mui";
import { useForm } from "@pankod/refine-react-hook-form";
import { useOne } from "@pankod/refine-core";
import { useParams } from "react-router-dom";

import Fields from "./Fields";

export default function CompEdit() {
  const {
    refineCore: { formLoading, queryResult },
    saveButtonProps,
    register,
    control,
    formState: { errors },
    getValues,
  } = useForm();

  const params = useParams();
  const record = useOne({
    resource: "resource",
    id: params.id,
  });

  return (
    <Edit isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Fields
        register={register}
        control={control}
        errors={errors}
        getValues={getValues}
        record={record.data.data}
      />
    </Edit>
  );
}
