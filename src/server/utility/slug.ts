/**
 * Convert a name value meant to be used as the primary identifier for a resource
 *
 * @param {string} name A resource's name to convert into a slugged version
 */
import slugify from "slugify";

export const slugifyIdName = (name: string): string => {
    return slugify(name, {
       lower: true
    });
};