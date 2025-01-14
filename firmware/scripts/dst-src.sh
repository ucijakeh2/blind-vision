####
## The purpose of this file is to distribute common source files to the dependee directories.
## This is made necessary by shortcomings of Arduino IDE which require all source files to be physically located 
##     in a single directory on disk.
####




# Input: source directory, destination directory, and the string to prepend
SRC_DIR="$1"
DST_DIR="$2"
PREPEND_STRING="$3"

# Check if source and destination directories are provided
if [[ -z "$SRC_DIR" || -z "$DST_DIR" || -z "$PREPEND_STRING" ]]; then
    echo "Usage: $0 <source_directory> <destination_directory> <string_to_prepend>"
    exit 1
fi

# Check if source directory exists
if [[ ! -d "$SRC_DIR" ]]; then
    echo "Source directory '$SRC_DIR' does not exist."
    exit 1
fi

# Create destination directory if it does not exist
mkdir -p "$DST_DIR"

# Loop through all files in the source directory
for FILE in "$SRC_DIR"/*; do
    if [[ -f "$FILE" ]]; then
        FILENAME=$(basename "$FILE")
        # Prepend the string and copy to the destination directory
        echo "$PREPEND_STRING$(cat "$FILE")" > "$DST_DIR/$FILENAME"
    fi
done

echo "All files have been copied and updated in '$DST_DIR'."
