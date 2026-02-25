import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Booking {
    id: bigint;
    mobileNumber: string;
    reasonSymptoms: string;
    preferredDate: string;
    preferredTime: string;
    patientName: string;
}
export interface PatientRecord {
    name: string;
    uhid: string;
    mobileNumber: string;
    symptoms: string;
}
export interface backendInterface {
    createPatientRecord(name: string, uhid: string, mobileNumber: string, symptoms: string): Promise<void>;
    getAllBookings(): Promise<Array<Booking>>;
    getPatientRecord(uhid: string): Promise<PatientRecord>;
    searchPatientRecords(searchTerm: string): Promise<Array<PatientRecord>>;
    submitBooking(patientName: string, mobileNumber: string, preferredDate: string, preferredTime: string, reasonSymptoms: string): Promise<void>;
}
