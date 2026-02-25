import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Booking, PatientRecord } from '../backend';

// ─── Bookings ────────────────────────────────────────────────────────────────

export function useGetAllBookings() {
    const { actor, isFetching } = useActor();

    return useQuery<Booking[]>({
        queryKey: ['bookings'],
        queryFn: async () => {
            if (!actor) return [];
            return actor.getAllBookings();
        },
        enabled: !!actor && !isFetching,
    });
}

export function useSubmitBooking() {
    const { actor } = useActor();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: {
            patientName: string;
            mobileNumber: string;
            preferredDate: string;
            preferredTime: string;
            reasonSymptoms: string;
        }) => {
            if (!actor) throw new Error('Actor not initialized');
            await actor.submitBooking(
                data.patientName,
                data.mobileNumber,
                data.preferredDate,
                data.preferredTime,
                data.reasonSymptoms
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['bookings'] });
        },
    });
}

// ─── Patients ─────────────────────────────────────────────────────────────────

export function useSearchPatients(searchTerm: string) {
    const { actor, isFetching } = useActor();

    return useQuery<PatientRecord[]>({
        queryKey: ['patients', searchTerm],
        queryFn: async () => {
            if (!actor) return [];
            return actor.searchPatientRecords(searchTerm);
        },
        enabled: !!actor && !isFetching,
    });
}

export function useGetPatientRecord(uhid: string) {
    const { actor, isFetching } = useActor();

    return useQuery<PatientRecord>({
        queryKey: ['patient', uhid],
        queryFn: async () => {
            if (!actor) throw new Error('Actor not initialized');
            return actor.getPatientRecord(uhid);
        },
        enabled: !!actor && !isFetching && !!uhid,
    });
}

export function useCreatePatientRecord() {
    const { actor } = useActor();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: {
            name: string;
            uhid: string;
            mobileNumber: string;
            symptoms: string;
        }) => {
            if (!actor) throw new Error('Actor not initialized');
            await actor.createPatientRecord(
                data.name,
                data.uhid,
                data.mobileNumber,
                data.symptoms
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['patients'] });
        },
    });
}
