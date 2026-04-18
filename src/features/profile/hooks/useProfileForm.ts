import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar } from "notistack";
import { useUpdateProfileMutation, useGetProfileQuery } from "@/features/profile/store/profileApi";
import { profileFormSchema } from "../validations/profileSchema";
import { mapUserProfileToUpdateProfile } from "../utils/profileUtils";
import { getErrorMessage } from "@/utils/errorUtils";
import type { UpdateProfileRequest } from "@/features/profile/types/profile";

export function useProfileForm() {
  const { enqueueSnackbar } = useSnackbar();
  const [editMode, setEditMode] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [formChanged, setFormChanged] = React.useState(false);

  const { data: user, isLoading: profileLoading, error: profileError } = useGetProfileQuery();
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const { control, handleSubmit, reset, watch } = useForm<UpdateProfileRequest>({
    resolver: yupResolver(profileFormSchema),
    defaultValues: mapUserProfileToUpdateProfile(user),
    mode: "onChange",
  });

  React.useEffect(() => {
    if (user) {
      reset(mapUserProfileToUpdateProfile(user));
    }
  }, [user, reset]);

  // Watch for form changes to enable Save button
  React.useEffect(() => {
    if (editMode) {
      const subscription = watch(() => setFormChanged(true));
      return () => subscription.unsubscribe();
    }
  }, [editMode, watch]);

  const handleEdit = () => setEditMode(true);
  const handleCancel = () => {
    reset();
    setEditMode(false);
    setFormChanged(false);
  };
  const handleConfirm = async (data: UpdateProfileRequest) => {
    try {
      await updateProfile(data).unwrap();
      enqueueSnackbar("Profile updated successfully", { variant: "success" });
      setEditMode(false);
      setShowConfirm(false);
      setFormChanged(false);
    } catch (e) {
      enqueueSnackbar(getErrorMessage(e as any), { variant: "error" });
    }
  };
  const handleCloseConfirm = () => setShowConfirm(false);

  return {
    // Data
    user,
    profileLoading,
    profileError,
    isLoading,
    // Form
    control,
    handleSubmit,
    // UI state
    editMode,
    showConfirm,
    formChanged,
    // Handlers
    handleEdit,
    handleCancel,
    handleConfirm,
    handleCloseConfirm,
    openConfirm: () => setShowConfirm(true),
  };
}
