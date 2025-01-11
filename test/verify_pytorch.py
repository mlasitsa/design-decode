import torch

# Check PyTorch installation
print("PyTorch imported successfully!")

# Check version
print("PyTorch version:", torch.__version__)

# Check CUDA availability
if torch.cuda.is_available():
    print("CUDA is available.")
    print("Number of GPUs:", torch.cuda.device_count())
    print("Current device:", torch.cuda.current_device())
    print("Device name:", torch.cuda.get_device_name(torch.cuda.current_device()))
else:
    print("CUDA is not available. Running on CPU.")

# Test tensor creation
tensor = torch.tensor([1, 2, 3, 4, 5])
print("Tensor:", tensor)

# Test tensor operation
result = tensor + 10
print("Tensor after addition:", result)
