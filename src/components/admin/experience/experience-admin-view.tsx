import useExperiences from "@/hooks/useExperience";
import AddExperienceModal from "./add-experience-modal";
import DeleteExperience from "./delete-experience";
import EditExperienceModal from "./edit-experience-modal";
import ExperienceCard from "./experience-card";

const ExperienceAdminView = () => {
  const experiencesData = useExperiences();

  return (
    <div className="mt-6 min-h-screen p-2">
      <AddExperienceModal />
      <div className="flex flex-wrap gap-6 p-2">
        {experiencesData?.map((item) => (
          <div key={item._id}>
            <div className="flex flex-wrap gap-6 p-6">
              <ExperienceCard experience={item} />
              <div className="flex gap-x-4">
                <EditExperienceModal projectId={item?._id} initialData={item} />
                {experiencesData.length > 1 && (
                  <>
                    <DeleteExperience projectId={item._id} />
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceAdminView;
