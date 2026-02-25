import Text "mo:core/Text";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import MixinStorage "blob-storage/Mixin";

actor {
  include MixinStorage();

  type Booking = {
    id : Nat;
    patientName : Text;
    mobileNumber : Text;
    preferredDate : Text;
    preferredTime : Text;
    reasonSymptoms : Text;
  };

  type PatientRecord = {
    name : Text;
    uhid : Text;
    mobileNumber : Text;
    symptoms : Text;
  };

  module PatientRecord {
    public func compare(record1 : PatientRecord, record2 : PatientRecord) : Order.Order {
      Text.compare(record1.uhid, record2.uhid);
    };
  };

  let bookings = Map.empty<Nat, Booking>();
  var nextBookingId = 0;

  let patients = Map.empty<Text, PatientRecord>();

  public shared ({ caller }) func submitBooking(patientName : Text, mobileNumber : Text, preferredDate : Text, preferredTime : Text, reasonSymptoms : Text) : async () {
    let booking : Booking = {
      id = nextBookingId;
      patientName;
      mobileNumber;
      preferredDate;
      preferredTime;
      reasonSymptoms;
    };
    bookings.add(nextBookingId, booking);
    nextBookingId += 1;
  };

  public query ({ caller }) func getAllBookings() : async [Booking] {
    bookings.values().toArray();
  };

  public shared ({ caller }) func createPatientRecord(name : Text, uhid : Text, mobileNumber : Text, symptoms : Text) : async () {
    if (patients.containsKey(uhid)) {
      Runtime.trap("Patient with this UHID already exists");
    };
    let record : PatientRecord = {
      name;
      uhid;
      mobileNumber;
      symptoms;
    };
    patients.add(uhid, record);
  };

  public query ({ caller }) func getPatientRecord(uhid : Text) : async PatientRecord {
    switch (patients.get(uhid)) {
      case (null) { Runtime.trap("Patient not found") };
      case (?record) { record };
    };
  };

  public query ({ caller }) func searchPatientRecords(searchTerm : Text) : async [PatientRecord] {
    let results = patients.filter(func(_uhid, record) { record.name.contains(#text searchTerm) or record.symptoms.contains(#text searchTerm) });
    results.values().toArray().sort();
  };
};
