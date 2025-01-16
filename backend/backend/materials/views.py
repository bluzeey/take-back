from rest_framework import viewsets
from rest_framework.response import Response
from .models import Material
from .serializers import MaterialSerializer

class MaterialViewSet(viewsets.ModelViewSet):
    queryset = Material.objects.all()
    serializer_class = MaterialSerializer

    def get_queryset(self):
        # Fetch materials only for the authenticated user
        return Material.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        # Automatically set the owner to the current user when creating a material
        serializer.save(owner=self.request.user)

    # Optionally, if you want to include a method to delete materials
    def destroy(self, request, *args, **kwargs):
        material = self.get_object()
        self.perform_destroy(material)
        return Response(status=204)

    # View to update material status
    def update_status(self, request, tracking_id):
        try:
            material = Material.objects.get(tracking_id=tracking_id)
            new_status = request.data.get('status')
            material.status = new_status
            material.save()
            return Response({"success": True, "status": new_status})
        except Material.DoesNotExist:
            return Response({"success": False, "error": "Material not found"}, status=404)

    # View to get material status
    def get_status(self, request, tracking_id):
        try:
            material = Material.objects.get(tracking_id=tracking_id)
            data = {
                "name": material.name,
                "description": material.description,
                "tracking_id": material.tracking_id,
                "status": material.status,
            }
            return Response(data)
        except Material.DoesNotExist:
            return Response({"error": "Material not found"}, status=404)
