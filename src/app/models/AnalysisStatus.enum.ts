export enum AnalysisStatus {
    REQUEST_SUBMITTED = "✔️ Analysis request transmitted and awaiting acceptance",
    PARTIAL_RESULTS = "❗ Partial results",
    SAMPLE_REJECTED = "✖️ Sample rejected",
    EXCEEDS_NORM = " ⚠️Exceeding standard",
    RECEIVED_IN_PROGRESS = " 🔬 Received in the laboratory, currently being analyzed",
    COMPLETE_RESULTS = "✔️✔️Complete results",
    NOT_POTABLE = "❗❗Undrinkable"
  }