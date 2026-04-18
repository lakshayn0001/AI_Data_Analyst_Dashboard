from flask import Flask, request, jsonify
import pandas as pd

app = Flask(__name__)

@app.route('/analyze', methods=['POST'])
def analyze():
    try:
        file_path = request.json.get("filePath")
        query = request.json.get("query")

        df = pd.read_csv(file_path)

      
        if query.get("action") == "sort":
            column = query.get("column")
            order = query.get("order", "asc")
            limit = query.get("limit")

            df = df.sort_values(by=column, ascending=(order == "asc"))

            if limit:
                df = df.head(limit)

            return jsonify({
                "data": df.to_dict(orient="records")
            })

        
        if query.get("action") == "groupby":
            column = query.get("column")
            metric = query.get("metric")

            result = df.groupby(column)[metric].sum().reset_index()

            return jsonify({
                "data": result.to_dict(orient="records")
            })

    
        if query.get("action") == "average":
            column = query.get("column")

            return jsonify({
                "data": [{"average": df[column].mean()}]
            })

       
        if query.get("action") == "count":
            return jsonify({
                "data": [{"count": len(df)}]
            })

        return jsonify({"message": "Query not supported yet"})

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(port=5001)