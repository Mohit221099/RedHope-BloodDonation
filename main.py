import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score, classification_report

# Load dataset
df = pd.read_csv("blood_availability.csv")
print(df["Hospital Name"].unique())

# Encode categorical variables
label_encoders = {}  # Dictionary to store encoders for each column

for col in ["Blood Group", "Hospital Name", "Location"]:
    le = LabelEncoder()
    df[col] = le.fit_transform(df[col])  # Encode column
    label_encoders[col] = le  # Save encoder

# Define target variable (Availability)
df["Availability"] = (df["Units Available"] > 0).astype(int)  # Convert units into binary class

# # Manually set Availability = 0 for certain blood groups in JNM only
# df.loc[(df["Blood Group"] == "A+") & (df["Hospital Name"] == "JNM"), "Availability"] = 0
# df.loc[(df["Blood Group"] == "O-") & (df["Hospital Name"] == "JNM"), "Availability"] = 0
# df.loc[(df["Blood Group"] == "B+") & (df["Hospital Name"] == "JNM"), "Availability"] = 0
# df.loc[(df["Blood Group"] == "AB-") & (df["Hospital Name"] == "JNM"), "Availability"] = 0

# Select features and target
feature_names = ["Blood Group", "Hospital Name", "Location", "Units Available"]
X = df[feature_names]  # Ensure correct feature order
y = df["Availability"]  # Target (Available: 1, Not Available: 0)

# Split data into training and testing sets (80% train, 20% test)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = RandomForestClassifier(n_estimators=200, max_depth=10, min_samples_split=5, min_samples_leaf=2, random_state=42)
model.fit(X_train, y_train)

# Evaluate model
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print("Model Accuracy:", accuracy)
print("Classification Report:\n", classification_report(y_test, y_pred))

# Save trained model and encoders
joblib.dump(model, "blood_availability_model.pkl")
joblib.dump(label_encoders, "label_encoders.pkl")
joblib.dump(feature_names, "feature_names.pkl")  # Save feature names for Streamlit

print("Model and encoders saved successfully!")
