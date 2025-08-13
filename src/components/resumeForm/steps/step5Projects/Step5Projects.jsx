// src/components/resumeForm/steps/step5Projects/Step5Projects.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";

import { step5ProjectsSchema } from "../../schemas/step5ProjectsSchema";
import styles from "./Step5Projects.module.css";

import StepNavigation from "../../components/stepNavigation/StepNavigation";
import {
  setProjects,
  setCurrentStep,
} from "../../../../features/resumeForm/resumeFormSlice";

const useEmptyProject = () =>
  useMemo(
    () => ({
      id: uuidv4(),
      projectName: "",
      description: "",
      techStack: "",
      tools: "",
      githubLink: "",
      projectLink: "",
      completionDate: "",
      roles: [], // now array
    }),
    []
  );

const Step5Projects = () => {
  const dispatch = useDispatch();
  const stored = useSelector((s) => s.resumeForm.projects);

  // Get unique job titles from Step 2's workExperience
  const roles = useSelector((state) => [
    ...new Set(
      (state.resumeForm.workExperience || [])
        .map((exp) => exp.jobTitle?.trim())
        .filter(Boolean)
    ),
  ]);

  const emptyProject = useEmptyProject();

  const defaults = useMemo(
    () => ({ projects: stored && stored.length > 0 ? stored : [emptyProject] }),
    [stored, emptyProject]
  );

  const {
    control,
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(step5ProjectsSchema),
    defaultValues: defaults,
    mode: "onBlur",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "projects",
  });

  const [expandedIndex, setExpandedIndex] = useState(0);

  useEffect(() => {
    if (stored?.length > 0) setExpandedIndex(0);
  }, [stored]);

  const handleToggle = (index) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  const handleAdd = () => {
    const item = { ...emptyProject, id: uuidv4() };
    const newIndex = fields.length;
    append(item);
    setValue(`projects.${newIndex}.id`, item.id);
    setExpandedIndex(newIndex);
  };

  const onBack = () => {
    const data = getValues();
    dispatch(setProjects(normalizeProjects(data.projects)));
    dispatch(setCurrentStep(4));
  };

  const onNext = (data) => {
    const normalized = normalizeProjects(data.projects);
    dispatch(setProjects(normalized));
    dispatch(setCurrentStep(6));
  };

  return (
    <form onSubmit={handleSubmit(onNext)}>
      {fields.map((field, index) => {
        const title =
          watch(`projects.${index}.projectName`) || "Untitled Project";

        const idPrefix = field.id || `proj-${index}`;
        const ids = {
          projectName: `${idPrefix}-name`,
          description: `${idPrefix}-desc`,
          techStack: `${idPrefix}-tech`,
          tools: `${idPrefix}-tools`,
          github: `${idPrefix}-github`,
          projectLink: `${idPrefix}-link`,
          completionDate: `${idPrefix}-date`,
        };

        return (
          <div key={field.id} className={styles.projectCard}>
            <div
              className={styles.cardHeader}
              onClick={() => handleToggle(index)}
            >
              <div className={styles.cardTitle}>{title}</div>
              <div className={styles.headerActions}>
                <button
                  type="button"
                  className={styles.actionButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggle(index);
                  }}
                >
                  {expandedIndex === index ? "Collapse" : "Edit"}
                </button>

                {fields.length > 1 && (
                  <button
                    type="button"
                    className={styles.actionButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      remove(index);
                      if (expandedIndex === index) setExpandedIndex(null);
                    }}
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>

            {expandedIndex === index && (
              <div className={styles.cardBody}>
                <input type="hidden" {...register(`projects.${index}.id`)} />

                <label htmlFor={ids.projectName}>Project Name</label>
                <input
                  id={ids.projectName}
                  className={styles.input}
                  {...register(`projects.${index}.projectName`)}
                />
                {errors?.projects?.[index]?.projectName && (
                  <small className={styles.error}>
                    {errors.projects[index].projectName.message}
                  </small>
                )}

                <label htmlFor={ids.description}>Description</label>
                <textarea
                  id={ids.description}
                  className={styles.input}
                  {...register(`projects.${index}.description`)}
                />
                {errors?.projects?.[index]?.description && (
                  <small className={styles.error}>
                    {errors.projects[index].description.message}
                  </small>
                )}

                <label htmlFor={ids.techStack}>Tech Stack</label>
                <input
                  id={ids.techStack}
                  className={styles.input}
                  {...register(`projects.${index}.techStack`)}
                />

                <label htmlFor={ids.tools}>Tools</label>
                <input
                  id={ids.tools}
                  className={styles.input}
                  {...register(`projects.${index}.tools`)}
                />

                <div className={styles.row}>
                  <div>
                    <label htmlFor={ids.github}>GitHub Link</label>
                    <input
                      id={ids.github}
                      type="url"
                      className={styles.input}
                      {...register(`projects.${index}.githubLink`)}
                    />
                  </div>

                  <div>
                    <label htmlFor={ids.projectLink}>Project Link</label>
                    <input
                      id={ids.projectLink}
                      type="url"
                      className={styles.input}
                      {...register(`projects.${index}.projectLink`)}
                    />
                  </div>
                </div>

                <div className={styles.row}>
                  <div>
                    <label htmlFor={ids.completionDate}>Completion Date</label>
                    <input
                      id={ids.completionDate}
                      className={styles.input}
                      type="date"
                      {...register(`projects.${index}.completionDate`)}
                    />
                  </div>

                  <div>
                    <label>For which role(s) you want to use this</label>
                    <div className={styles.checkboxGroup}>
                      {roles.map((role, rIndex) => (
                        <label
                          key={rIndex}
                          className={styles.checkboxItem}
                        >
                          <input
                            type="checkbox"
                            value={role}
                            checked={
                              watch(`projects.${index}.roles`)?.includes(role) ||
                              false
                            }
                            onChange={(e) => {
                              const currentRoles =
                                watch(`projects.${index}.roles`) || [];
                              let updatedRoles;
                              if (e.target.checked) {
                                updatedRoles = [...currentRoles, role];
                              } else {
                                updatedRoles = currentRoles.filter(
                                  (r) => r !== role
                                );
                              }
                              setValue(
                                `projects.${index}.roles`,
                                updatedRoles,
                                { shouldValidate: true }
                              );
                            }}
                          />
                          {role}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}

      <button type="button" onClick={handleAdd} className={styles.addButton}>
        + Add another project
      </button>

      <div className={styles.footer}>
        <StepNavigation
          showBack={true}
          onBack={onBack}
          onNext={handleSubmit(onNext)}
          backLabel="Back"
          nextLabel="Next"
        />
      </div>
    </form>
  );
};

// Normalize and remove completely empty entries (keep ids)
function normalizeProjects(list = []) {
  return (list || [])
    .map((p) => ({
      id: p.id || uuidv4(),
      projectName: p.projectName?.trim() || "",
      description: p.description?.trim() || "",
      techStack: p.techStack?.trim() || "",
      tools: p.tools?.trim() || "",
      githubLink: p.githubLink?.trim() || "",
      projectLink: p.projectLink?.trim() || "",
      completionDate: p.completionDate || "",
      roles: p.roles || [],
    }))
    .filter((p) =>
      [
        p.projectName,
        p.description,
        p.techStack,
        p.tools,
        p.githubLink,
        p.projectLink,
        p.completionDate,
        ...(p.roles || []),
      ].some(Boolean)
    );
}

export default Step5Projects;
