import { useMutation } from "@tanstack/react-query";
import {
  organizationService,
  CreateOrganizationRequest,
  Organization,
} from "../../services/organizationService";

export const useAddOrgnizationMutation = () => {
  return useMutation<Organization, Error, CreateOrganizationRequest>({
    mutationFn: (payload: CreateOrganizationRequest) =>
      organizationService.create(payload),
  });
};

