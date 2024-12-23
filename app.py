from flask import Flask, request, jsonify

app = Flask(__name__)

# In-memory "database" to store reviews 
reviews = []

@app.route('/')
def home():
    return "Welcome to Mandhi Finder"

# Route to add reviews
@app.route('/reviews', methods=['POST'])
def add_review():
    try:
        # Get the review data from the JSON body of the request
        data = request.get_json()
        print(reviews)
        # Check if the necessary fields are in the data
        if 'mandhi_id' not in data or 'user' not in data or 'rating' not in data or 'comment' not in data:
            return jsonify({"message": "Missing required fields!"}), 400
        
        # Add the review to the "database" 
        reviews.append(data)
        
        # Return a success message
        return jsonify({"message": "Review added successfully!"}), 200
    
    except Exception as e:
        #  return an error message
        return jsonify({"message": "Error processing the review", "error": str(e)}), 500

# Start the Flask app
if __name__ == '__main__':
    app.run(debug=True)
