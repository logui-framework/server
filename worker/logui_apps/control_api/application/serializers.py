from rest_framework import serializers

from ...control.models import Application, Flight


class ApplicationSerializer(serializers.ModelSerializer):
    flights = serializers.SerializerMethodField(read_only=True)

    def get_flights(self, application_reference):
        return Flight.objects.filter(application=application_reference).count()

    class Meta:
        model = Application
        fields = '__all__'







# class GetLanguageSerializer(serializers.ModelSerializer):
#     technology = serializers.StringRelatedField(many=True)
#     frameworks = serializers.StringRelatedField(many=True)

#     total_technology = serializers.SerializerMethodField(read_only=True)
#     toatl_frameworks = serializers.SerializerMethodField(read_only=True)

#     def get_toatl_frameworks(self, language):
#         return language.frameworks.count()

#     def get_total_technology(self, language):
#         return language.technology.count() # change 'technology' with corresponding "related_name" value

#     class Meta:
#         model = Language
#         fields = (other_fileds, 'total_technology', 'toatl_frameworks')
#         depth = 1